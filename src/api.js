import { user } from "./store";
import axios from "axios";

const APIdelay = 300;

export async function addAlbums(side) {
	resetProgress();
	let albumDetails = [];
	let delayms = 0;
	let trackURIs = [];
	user.log(
		`It's time to add ${user.selectedAlbums.length} albums to the ${side} of ${user.selectedPlaylists.length} playlists`,
		"start"
	);
	for (var i = 0; i < user.selectedAlbums.length; i++) {
		// console.log(user.selectedAlbums);
		let res = await axios.get(
			`https://api.spotify.com/v1/albums/${user.selectedAlbums[i]}/tracks`,
			{
				headers: {
					Authorization: "Bearer " + user.token,
				},
			}
		);
		albumDetails = albumDetails.concat(res.data);
		user.log(
			`Grabbing track info for ${
				user.allAlbums[user.selectedAlbums[i]].name
			}`
		);
		// console.log(albumDetails);
		for (var cha = 0; cha < albumDetails[i].total; cha++) {
			trackURIs.push(albumDetails[i].items[cha].uri);
		}
	}
	// console.log(trackURIs);

	// Go through each playlist and add the albums to it
	for (var j = 0; j < user.selectedPlaylists.length; j++) {
		const playlist = user.selectedPlaylists[j];
		// Don't add album if it's already on the playlist
		// console.log(playlist.albumList, user.album.name, playlist.albumList.indexOf(user.album.name));
		// if (playlist.albumList.indexOf(user.album.name) === -1) {
		if (true) {
			let data =
				side === "start"
					? {
							uris: trackURIs,
							position: 0,
					  }
					: {
							uris: trackURIs,
					  };
			try {
				await axios.post(
					`https://api.spotify.com/v1/playlists/${playlist.id}/tracks`,
					data,
					{
						headers: {
							Authorization: "Bearer " + user.token,
							"Content-Type": "application/json",
						},
					}
				);
				user.log(
					`Successfully plopped ${trackURIs.length} beats onto ${playlist.name}.`
				);
			} catch (err) {
				user.log(`Houston, we had an issue with ${playlist.name}...`);
				console.log(err);
			}
		}

		updateProgress();
		delayms += APIdelay;
		await delay(delayms);
	}
	// Retreive all modified playlists again from spotify to ensure they are up to date.
	updateLocalPlaylistTracks();
	resetProgress();
	user.log(`All finished big guy.`, "end");
}

export async function updateLocalPlaylistTracks() {
	// Loop through all playlists, getting the data
	resetProgress();
	let delayms = 0;
	for (var i = 0; i < user.selectedPlaylists.length; i++) {
		const id = user.selectedPlaylists[i].id;
		const [
			newTracks,
			newAlbums,
			albumList,
			lastUpdated,
			playlistMilliseconds,
		] = await getPlaylistTracksAndAlbums(id);
		user.allPlaylists[id].tracks = newTracks;
		user.allPlaylists[id].albums = newAlbums;
		user.allPlaylists[id].albumList = albumList;
		user.allPlaylists[id].lastUpdated = lastUpdated;
		user.allPlaylists[id].playlistMilliseconds = playlistMilliseconds;
		updateProgress();
		delayms += APIdelay;
		await delay(delayms);
	}
}

export async function replaceDescription(description) {
	resetProgress();
	let delayms = 0;
	user.log(
		`Description time! Changing the description of ${user.selectedPlaylists.length} playlists.`,
		"start"
	);
	// Go through each playlist and replace the description
	for (var j = 0; j < user.selectedPlaylists.length; j++) {
		const playlist = user.selectedPlaylists[j];
		let data = { description };

		try {
			let res = await axios.put(
				`https://api.spotify.com/v1/playlists/${playlist.id}/`,
				data,
				{
					headers: {
						Authorization: "Bearer " + user.token,
						"Content-Type": "application/json",
					},
				}
			);
			// If successful, update local
			if (res.status === 200) {
				user.log(
					`Bam. Description of ${user.selectedPlaylists[j].name} updated.`
				);
				user.allPlaylists[playlist.id].description = description;
			}
		} catch (err) {
			user.log(`Uh oh! There was an issue with .`);
			console.log(err);
		}

		updateProgress();
		delayms += APIdelay;
		await delay(delayms);
	}
	resetProgress();
	user.log(`We're done here.`, "end");
}

export async function getPlaylistTracksAndAlbums(album_id) {
	let nextLink;
	let APItracks = [];
	let tracks = {};
	let albums = [];
	let albumList = "";
	let lastUpdated = Date.parse("1980-01-01T12:00:00Z");
	let playlistMilliseconds = 0;
	let hasLSAlbum = false;
	do {
		let res = await axios.get(
			nextLink ||
				`https://api.spotify.com/v1/playlists/${album_id}/tracks?fields=`,
			{
				headers: {
					Authorization: "Bearer " + user.token,
				},
			}
		);
		// console.log(res);
		APItracks = APItracks.concat(res.data.items);
		nextLink = res.data.next;
	} while (nextLink);

	console.log(user.allAlbums);
	for (const i in APItracks) {
		const track = APItracks[i].track;
		tracks[i] = { place: i, id: track.id, album: track.album.name };
		playlistMilliseconds += track.duration_ms;
		const trackAddedDate = Date.parse(APItracks[i].added_at);

		if (user.allAlbums.hasOwnProperty(track.album.id)) {
			hasLSAlbum = true;
		}
		// Updated lastUpdated if trackAddedDate is later
		if (trackAddedDate > lastUpdated) {
			lastUpdated = trackAddedDate;
		}

		if (albumList.indexOf(track.album.name) === -1) {
			albums.push({ id: track.album.id, name: track.album.name });
			// albums.push(track.album.name);
			albumList += track.album.name + ", ";
		}
	}

	if (!hasLSAlbum && Object.entries(tracks).length > 0) {
		tracks = undefined;
	}

	// Remove comma/space from album list
	albumList = albumList.substring(0, albumList.length - 2);

	return [tracks, albums, albumList, lastUpdated, playlistMilliseconds];
}

export async function getAllUserPlaylists() {
	// let nextLink;
	// let newPlaylistsFromAPI = [];
	// do {
	// 	let res = await axios.get(nextLink || `https://api.spotify.com/v1/me/playlists?limit=50`, {
	// 		headers: {
	// 			Authorization: 'Bearer ' + token,
	// 		},
	// 	});
	// 	console.log(res);
	// 	let playlistBatch = res.data.items;
	// 	for (const i in playlistBatch) {
	// 		let playlist = playlistBatch[i];
	// 		if (playlist.owner.id === user.id) {
	// 			let dupe = playlists.find((element) => element.id === playlist.id);
	// 			if (dupe === undefined) {
	// 				newPlaylistsFromAPI.push({
	// 					id: playlist.id,
	// 					name: playlist.name,
	// 					url: playlist.external_urls.spotify,
	// 					tracks_endpoint: playlist.tracks.href,
	// 					tracks: {},
	// 					albumList: 'Loading...',
	// 					albums: {},
	// 				});
	// 			}
	// 		}
	// 	}
	// 	nextLink = res.data.next;
	// } while (nextLink);
	// const newList = [...playlists].concat(newPlaylistsFromAPI);
	// setPlaylists(newList);
	// localStorage.setItem('user-playlists', JSON.stringify(newList));
	// const delayIncrement = 300;
	// let currentDelay = -delayIncrement;
	// for (const i in playlists) {
	// 	let playlist = playlists[i];
	// 	if (playlist.albumList === 'Loading...') {
	// 		const [newTracks, newAlbums, newAlbumList] = await getTracksAndAlbums(playlist.id, currentDelay);
	// 		console.log(newTracks, newAlbums, newAlbumList);
	// 		let playlistsCopy = [...playlists];
	// 		playlistsCopy[i].tracks = newTracks;
	// 		playlistsCopy[i].albums = newAlbums;
	// 		playlistsCopy[i].albumList = newAlbumList;
	// 		setPlaylists(playlistsCopy);
	// 		localStorage.setItem('user-playlists', JSON.stringify(playlistsCopy));
	// 	}
	// }
}

function resetProgress() {
	user.progress.done = 0;
	user.progress.total = user.selectedPlaylists.length;
	user.progress.percent = 0;
}
function updateProgress() {
	user.progress.done++;
	user.progress.percent = (user.progress.done / user.progress.total) * 100;
}

async function delay(ms) {
	await timeout(ms);
}

const timeout = (ms) => new Promise((res) => setTimeout(res, ms));

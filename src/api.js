import { user } from "./store";
import axios from "axios";

const APIdelay = 300;

export async function addAlbums(side, replaceArg) {
	resetProgress();
	const replace = replaceArg === "replace" ? true : false;
	let albumDetails = [];
	let delayms = 0;
	let trackURIs = [];
	let newAlbumsString = "";
	let addedTime = 0;
	let newAlbumsList = [];
	let newTracksList = [];

	if (replace) {
		side = "end";
	}
	user.log(
		`It's time to add ${user.selectedAlbums.length} albums to the ${side} of ${user.selectedPlaylists.length} playlists`,
		"start"
	);
	for (var i = 0; i < user.selectedAlbums.length; i++) {
		user.log(
			`Grabbing track info for ${
				user.allAlbums[user.selectedAlbums[i]].name
			}`
		);
		let res = await axios.get(
			`https://api.spotify.com/v1/albums/${user.selectedAlbums[i]}/tracks`,
			{
				headers: {
					Authorization: "Bearer " + user.token,
				},
			}
		);
		albumDetails = albumDetails.concat(res.data);
		newAlbumsString += `${user.allAlbums[user.selectedAlbums[i]].name}, `;
		newAlbumsList.push(user.allAlbums[user.selectedAlbums[i]]);
		// console.log(albumDetails);
		for (var cha = 0; cha < albumDetails[i].total; cha++) {
			trackURIs.push(albumDetails[i].items[cha].uri);
			addedTime += albumDetails[i].items[cha].duration_ms;
			newTracksList.push({
				place: cha,
				id: albumDetails[i].items[cha].id,
				length: albumDetails[i].items[cha].duration_ms,
				album: user.selectedAlbums[i].name,
			});
		}
	}
	console.log(newAlbumsList);
	console.log(newTracksList);

	// Go through each playlist and add the albums to it
	for (var j = 0; j < user.selectedPlaylists.length; j++) {
		const playlist = user.selectedPlaylists[j];
		console.log(playlist.tracks);
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
				let res;
				const apiURL = `https://api.spotify.com/v1/playlists/${playlist.id}/tracks`;
				if (replace) {
					res = await axios.put(apiURL, data, {
						headers: {
							Authorization: "Bearer " + user.token,
							"Content-Type": "application/json",
						},
					});
				} else {
					res = await axios.post(apiURL, data, {
						headers: {
							Authorization: "Bearer " + user.token,
							"Content-Type": "application/json",
						},
					});
				}

				// If successful, update local
				console.log(res);
				if (res.status === 201) {
					if (replace) {
						user.log(
							`Removed all previous albums from ${playlist.name}.`
						);
						user.allPlaylists[playlist.id].albumList = "";
						user.allPlaylists[playlist.id].albums = [];
						user.allPlaylists[playlist.id].tracks = [];
						user.allPlaylists[playlist.id].playlistMilliseconds = 0;
					}
					user.log(
						`Successfully plopped ${trackURIs.length} beats onto ${playlist.name}.`
					);
					// Update list of albums

					if (side === "start") {
						user.allPlaylists[playlist.id].albumList =
							newAlbumsString +
							user.allPlaylists[playlist.id].albumList;

						user.allPlaylists[playlist.id].albums = arrayConcat(
							newAlbumsList,
							user.allPlaylists[playlist.id].albums
						);
						user.allPlaylists[playlist.id].tracks = arrayConcat(
							newTracksList,
							user.allPlaylists[playlist.id].tracks
						);
					} else {
						if (user.allPlaylists[playlist.id].albumList !== "") {
							user.allPlaylists[playlist.id].albumList += ", ";
						}
						user.allPlaylists[playlist.id].albumList =
							user.allPlaylists[playlist.id].albumList +
							newAlbumsString.substring(
								0,
								newAlbumsString.length - 2
							);
						user.allPlaylists[playlist.id].albums = arrayConcat(
							user.allPlaylists[playlist.id].albums,
							newAlbumsList
						);
						user.allPlaylists[playlist.id].tracks = arrayConcat(
							user.allPlaylists[playlist.id].tracks,
							newTracksList
						);
					}
					// Update total time
					user.allPlaylists[
						playlist.id
					].playlistMilliseconds += addedTime;
					// Update lastUpdated
					user.allPlaylists[
						playlist.id
					].lastUpdated = Date.now().toString();
				}
			} catch (err) {
				user.log(`Houston, we had an issue with ${playlist.name}...`);
				console.log(err);
			}
		}

		updateProgress();
		delayms += APIdelay;
		await delay(delayms);
	}

	user.log(`All finished big guy.`, "end");
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

// Refresh: get list of playlist tracks and re-add them to playlist
export async function refreshPlaylists() {
	console.log("hey");
	for (var i = 0; i < user.selectedPlaylists.length; i++) {
		const playlist = user.selectedPlaylists[i];
		let data = { uris: [] };
		// Get list of playlist tracks
		for (var j = 0; j < Object.keys(playlist.tracks).length; j++) {
			console.log(playlist.tracks[j]);
			data.uris.push(`spotify:track:${playlist.tracks[j].id}`);
		}
		try {
			let res;
			const apiURL = `https://api.spotify.com/v1/playlists/${playlist.id}/tracks`;
			res = await axios.put(
				apiURL,
				{ uris: [] },
				{
					headers: {
						Authorization: "Bearer " + user.token,
						"Content-Type": "application/json",
					},
				}
			);
			res = await axios.put(apiURL, data, {
				headers: {
					Authorization: "Bearer " + user.token,
					"Content-Type": "application/json",
				},
			});

			// If successful, update local
			console.log(res);
			if (res.status === 201) {
				user.log(`${playlist.name} is looking refreshed af.`);
			} else {
				user.log(
					`Refreshing ${playlist.name} gave us an error. Not cool man.`
				);
			}
		} catch (err) {
			user.log(
				`Refreshing ${playlist.name} gave us an error. Not cool man.`
			);
			console.log(err);
		}
	}
}

export async function getPlaylistTracksAndAlbums(album_id) {
	let nextLink;
	let APItracks = [];
	let tracks = [];
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

	for (const i in APItracks) {
		const track = APItracks[i].track;
		tracks.push({
			place: i,
			id: track.id,
			length: track.duration_ms,
			album: track.album.name,
		});
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

function arrayConcat(arr1, arr2) {
	arr2.forEach(function (item) {
		arr1.push(item);
	});
	return arr1;
}

const timeout = (ms) => new Promise((res) => setTimeout(res, ms));

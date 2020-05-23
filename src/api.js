import { user } from './store';
import axios from 'axios';

const APIdelay = 300;

export async function addAlbums(side) {
	console.log('Go time!');
	resetProgress();
	let albumDetails = [];
	let delayms = 0;
	let trackURIs = [];
	for (var i = 0; i < user.selectedAlbums.length; i++) {
		// console.log(user.selectedAlbums);
		let res = await axios.get(`https://api.spotify.com/v1/albums/${user.selectedAlbums[i]}/tracks`, {
			headers: {
				Authorization: 'Bearer ' + user.token,
			},
		});
		albumDetails = albumDetails.concat(res.data);
		console.log(albumDetails);
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
				side === 'start'
					? {
							uris: trackURIs,
							position: 0,
					  }
					: {
							uris: trackURIs,
					  };
			try {
				let res = await axios.post(`https://api.spotify.com/v1/playlists/${playlist.id}/tracks`, data, {
					headers: {
						Authorization: 'Bearer ' + user.token,
						'Content-Type': 'application/json',
					},
				});
			} catch (err) {
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
}

export async function updateLocalPlaylistTracks() {
	// Loop through all playlists, getting the data
	resetProgress();
	let delayms = 0;
	for (var i = 0; i < user.selectedPlaylists.length; i++) {
		const id = user.selectedPlaylists[i].id;
		const [newTracks, newAlbums, newAlbumList] = await getPlaylistTracks(id);
		user.allPlaylists[id].tracks = newTracks;
		user.allPlaylists[id].albums = newAlbums;
		user.allPlaylists[id].albumList = newAlbumList;
		updateProgress();
		delayms += APIdelay;
		await delay(delayms);
	}
}

export async function replaceDescription(description) {
	console.log('Go time!');
	resetProgress();
	let delayms = 0;

	// Go through each playlist and replace the description
	for (var j = 0; j < user.selectedPlaylists.length; j++) {
		const playlist = user.selectedPlaylists[j];
		let data = { description };
		try {
			let res = await axios.put(`https://api.spotify.com/v1/playlists/${playlist.id}/`, data, {
				headers: {
					Authorization: 'Bearer ' + user.token,
					'Content-Type': 'application/json',
				},
			});
			// If successful, update local
			if (res.status === 200) {
				user.allPlaylists[playlist.id].description = description;
			}
		} catch (err) {
			console.log(err);
		}

		updateProgress();
		delayms += APIdelay;
		await delay(delayms);
	}
	resetProgress();
}

export async function getPlaylistTracks(id) {
	let nextLink;
	let APItracks = [];
	let tracks = {};
	let albums = {};
	let albumList = '';
	do {
		let res = await axios.get(nextLink || `https://api.spotify.com/v1/playlists/${id}/tracks?fields=`, {
			headers: {
				Authorization: 'Bearer ' + user.token,
			},
		});
		console.log(res);
		APItracks = APItracks.concat(res.data.items);
		nextLink = res.data.next;
	} while (nextLink);

	for (const i in APItracks) {
		const track = APItracks[i].track;
		tracks[i] = { place: i, id: track.id, album: track.album.name };
		if (albums.hasOwnProperty(track.album.name)) {
			albums[track.album.name].trackCount += 1;
		} else {
			albums[track.album.name] = { name: track.album.name, trackCount: 0 };
			albumList += ', ' + track.album.name;
		}
	}

	albumList = albumList.substring(2);

	return [tracks, albums, albumList];
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

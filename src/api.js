import { user } from './store';
import axios from 'axios';

const APIdelay = 300;

export async function addAlbum(side) {
	console.log('Go time!');
	user.progress.done = 0;
	user.progress.total = user.selectedPlaylists.length;
	user.progress.percent = 0;

	let delayms = 0;

	let res = await axios.get(`https://api.spotify.com/v1/albums/${user.album.id}/tracks`, {
		headers: {
			Authorization: 'Bearer ' + user.token,
		},
	});
	const albumDetails = res.data;
	let trackURIs = [];
	for (var i = 0; i < albumDetails.total; i++) {
		trackURIs.push(albumDetails.items[i].uri);
	}

	for (var j = 0; j < user.selectedPlaylists.length; j++) {
		const playlist = user.selectedPlaylists[j];
		// Don't add album if it's already on the playlist
		console.log(playlist.albumList, user.album.name, playlist.albumList.indexOf(user.album.name));
		if (playlist.albumList.indexOf(user.album.name) === -1) {
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
				// Update local store
				const firstTrackPos = side === 'start' ? 0 : user.allPlaylists[playlist.id].tracks.length;
				user.allPlaylists[playlist.id].albumList =
					side === 'start'
						? `${user.album.name}, ` + user.allPlaylists[playlist.id].albumList
						: (user.allPlaylists[playlist.id].albumList += `, ${user.album.name}`);

				for (var k = 0; k < albumDetails.total; k++) {
					let nextNum = firstTrackPos + k;
					user.allPlaylists[playlist.id].tracks[nextNum] = {
						place: nextNum,
						id: albumDetails.items[k].id,
						album: albumDetails.name,
					};
				}
			} catch (err) {
				console.log(err);
			}
		}

		user.progress.done++;
		user.progress.percent = (user.progress.done / user.progress.total) * 100;
		delayms += APIdelay;
		await delay(delayms);
	}
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

async function delay(ms) {
	await timeout(ms);
}

const timeout = (ms) => new Promise((res) => setTimeout(res, ms));

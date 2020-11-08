import { user, addPlaylist } from "./store";
import axios from "axios";
import cloneDeep from "lodash/cloneDeep";

const APIdelay = 300;

export async function loadTable() {
	let nextLink;
	user.log(`Fetching all of ${user.name}'s playlists`);
	// Loop until we get all playlists
	do {
		// Get playlists from spotify
		let res = await axios.get(
			nextLink || `https://api.spotify.com/v1/me/playlists?limit=50`,
			{
				headers: {
					Authorization: "Bearer " + user.token,
				},
			}
		);
		// console.log(res);
		let playlistBatch = res.data.items;
		user.log(`Retrieved ${res.data.items.length} playlists`);

		// Loop through playlists in that batch
		for (const i in playlistBatch) {
			let playlist = playlistBatch[i];
			// Only get playlists that are owned by the logged in user
			if (playlist.owner.id === user.id) {
				// If we already have the playlist in our list for some reason, don't add it
				if (
					user.allPlaylists.findIndex((p) => p.id === playlist.id) ===
						-1 &&
					user.filteredPlaylists.indexOf(playlist.id) === -1
				) {
					// Get track and album details
					await delay(APIdelay);
					playlist = await getPlaylistTracks(playlist);

					if (playlist.tracks !== undefined) {
						// Add it to the store
						console.log(playlist);
						addPlaylist(playlist);
					} else {
						user.log(`${playlist.name} was not relaxing enough.`);
						const newFiltered = user.filteredPlaylists.splice();
						newFiltered.push(playlist.id);
						user.filteredPlaylists = newFiltered;
					}
				}
			}
		}
		// If there's an API link for more, get more
		nextLink = res.data.next;
	} while (nextLink);
}

async function getPlaylistTracks(playlist) {
	let nextLink;
	let APItracks = [];
	let hasLSAlbum = false;

	const newData = {
		tracks: [],
		albums: [],
		albumsString: "",
		lastUpdated: Date.parse("1980-01-01T12:00:00Z"),
		playlistMilliseconds: 0,
	};

	// Get all tracks on the playlist
	do {
		let res = await axios.get(
			nextLink ||
				`https://api.spotify.com/v1/playlists/${playlist.id}/tracks?fields=`,
			{
				headers: {
					Authorization: "Bearer " + user.token,
				},
			}
		);
		// console.log(res);
		APItracks = APItracks.concat(res.data.items);
		for (const trackData of res.data.items) {
			if (trackData.track.artists[0].name === "Little Symphony") {
				hasLSAlbum = true;
				break;
			}
		}
		nextLink = res.data.next;
	} while (nextLink && hasLSAlbum);

	if (!hasLSAlbum) {
		playlist.tracks = undefined;
		return playlist;
	}

	for (const i in APItracks) {
		const track = APItracks[i].track;
		newData.tracks.push({
			place: i,
			id: track.id,
			length: track.duration_ms,
			album: track.album.name,
		});

		newData.playlistMilliseconds += track.duration_ms;
		const trackAddedDate = Date.parse(APItracks[i].added_at);

		// Updated lastUpdated if trackAddedDate is later
		if (trackAddedDate > newData.lastUpdated) {
			newData.lastUpdated = trackAddedDate;
		}

		if (newData.albumsString.indexOf(track.album.name) === -1) {
			newData.albums.push({ id: track.album.id, name: track.album.name });
			newData.albumsString += track.album.name + ", ";
		}
	}

	if (!hasLSAlbum && Object.entries(newData.tracks).length > 0) {
		newData.tracks = undefined;
	}

	// Remove comma/space from album list
	newData.albumsString = newData.albumsString.substring(
		0,
		newData.albumsString.length - 2
	);
	playlist = {
		...playlist,
		...newData,
	};

	return playlist;
}

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

	// Tell the user what's up
	if (replace) {
		side = "end";
		user.log(
			`It's time to replace ${user.selectedPlaylists.length} playlists with ${user.selectedAlbums.length} selected albums.`,
			"start"
		);
	} else {
		user.log(
			`It's time to add ${user.selectedAlbums.length} albums to the ${side} of ${user.selectedPlaylists.length} playlists`,
			"start"
		);
	}

	// Get track information from each of the albums
	for (var i = 0; i < user.selectedAlbums.length; i++) {
		user.log(
			`Grabbing track info for ${
				user.allAlbums[user.selectedAlbums[i]].name
			}`
		);
		let res = await axios.get(
			`https://api.spotify.com/v1/albums/${user.selectedAlbums[i]}/tracks?limit=50`,
			{
				headers: {
					Authorization: "Bearer " + user.token,
				},
			}
		);
		albumDetails = albumDetails.concat(res.data);
		newAlbumsString += `${user.allAlbums[user.selectedAlbums[i]].name}, `;
		newAlbumsList.push(user.allAlbums[user.selectedAlbums[i]]);
		console.log(albumDetails[0]);
		for (
			var trackCount = 0;
			trackCount < albumDetails[i].total;
			trackCount++
		) {
			trackURIs.push(albumDetails[i].items[trackCount].uri);
			addedTime += albumDetails[i].items[trackCount].duration_ms;
			newTracksList.push({
				place: trackCount,
				id: albumDetails[i].items[trackCount].id,
				length: albumDetails[i].items[trackCount].duration_ms,
				album: user.selectedAlbums[i].name,
			});
		}
	}
	console.log(newAlbumsList);
	console.log(newTracksList);
	const numTracks = trackURIs.length;

	// Go through each playlist and add the albums to it
	for (var j = 0; j < user.selectedPlaylists.length; j++) {
		const playlistId = user.selectedPlaylists[j];
		const playlistIndex = user.allPlaylists.findIndex(
			(p) => p.id === playlistId
		);
		const playlist = user.allPlaylists[playlistIndex];
		console.log(playlist.tracks);
		// Don't add album if it's already on the playlist
		// console.log(playlist.albumList, user.album.name, playlist.albumList.indexOf(user.album.name));
		// if (playlist.albumList.indexOf(user.album.name) === -1) {
		if (true) {
			try {
				let res;
				do {
					let data =
						side === "start"
							? {
									uris: [],
									position: 0,
							  }
							: {
									uris: [],
							  };
					for (var k = 0; k < trackURIs.length; k++) {
						let trackURI;
						if (side === "start") {
							trackURI = trackURIs[trackURIs.length - 1 - k];
							data.uris.unshift(trackURI);
						} else {
							trackURI = trackURIs[k];
							data.uris.push(trackURI);
						}

						if (k === 99) {
							break;
						}
					}
					if (side === "start") {
						trackURIs = trackURIs.slice(0, -data.uris.length);
					} else {
						trackURIs = trackURIs.slice(
							data.uris.length,
							trackURIs.length
						);
					}

					const apiURL = `https://api.spotify.com/v1/playlists/${playlist.id}/tracks`;
					if (
						replace &&
						trackURIs.length + data.uris.length === numTracks
					) {
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
					console.log(res);
				} while (trackURIs.length > 0);

				// If successful, update local
				console.log(res);
				if (res.status === 201) {
					if (replace) {
						user.log(
							`Removed all previous albums from ${playlist.name}.`
						);
						user.allPlaylists[playlistIndex].albumsString = "";
						user.allPlaylists[playlistIndex].albums = [];
						user.allPlaylists[playlistIndex].tracks = [];
						user.allPlaylists[
							playlistIndex
						].playlistMilliseconds = 0;
					}
					user.log(
						`Successfully plopped ${numTracks} beats onto ${playlist.name}.`
					);
					// Update list of albums
					let newPlaylistData = cloneDeep(
						user.allPlaylists[playlistIndex]
					);
					if (side === "start") {
						newPlaylistData.albumsString =
							newAlbumsString + newPlaylistData.albumsString;

						newPlaylistData.albums = arrayConcat(
							newAlbumsList,
							newPlaylistData.albums
						);
						newPlaylistData.tracks = arrayConcat(
							newTracksList,
							newPlaylistData.tracks
						);
					} else {
						if (newPlaylistData.albumsString !== "") {
							newPlaylistData.albumsString += ", ";
						}
						newPlaylistData.albumsString =
							newPlaylistData.albumsString +
							newAlbumsString.substring(
								0,
								newAlbumsString.length - 2
							);
						newPlaylistData.albums = arrayConcat(
							newPlaylistData.albums,
							newAlbumsList
						);
						newPlaylistData.tracks = arrayConcat(
							newPlaylistData.tracks,
							newTracksList
						);
					}
					// Update total time
					newPlaylistData.playlistMilliseconds += addedTime;
					// Update lastUpdated
					newPlaylistData.lastUpdated = Date.now().toString();
					// Write back to state
					user.allPlaylists[playlistIndex] = newPlaylistData;
				}
			} catch (err) {
				user.log(
					`Houston, we had an issue with ${playlist.name}.`,
					"error"
				);
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
		const playlistId = user.selectedPlaylists[j];
		const playlistIndex = user.allPlaylists.findIndex(
			(p) => p.id === playlistId
		);
		const playlist = user.allPlaylists[playlistIndex];
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
				user.log(`Bam. Description of ${playlist.name} updated.`);
				playlist.description = description;
				user.allPlaylists[playlistIndex] = playlist;
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
	user.log(
		`We're about to refresh ${user.selectedPlaylists.length} playlists.`,
		"start"
	);
	for (var i = 0; i < user.selectedPlaylists.length; i++) {
		const playlistId = user.selectedPlaylists[i];
		const playlistIndex = user.allPlaylists.findIndex(
			(p) => p.id === playlistId
		);
		const playlist = user.allPlaylists[playlistIndex];

		let URIsToSend = [];
		// Get list of playlist tracks
		for (var j = 0; j < Object.keys(playlist.tracks).length; j++) {
			URIsToSend.push(`spotify:track:${playlist.tracks[j].id}`);
		}
		try {
			let res;
			// Remove old tracks
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
			// Add tracks back in batches of 100
			do {
				console.log(URIsToSend);
				let data = { uris: [] };
				for (var k = 0; k < URIsToSend.length; k++) {
					data.uris.push(URIsToSend[k]);
					if (k === 99) {
						break;
					}
				}
				URIsToSend = URIsToSend.slice(
					data.uris.length,
					URIsToSend.length
				);
				console.log(URIsToSend);
				console.log(data);
				res = await axios.post(apiURL, data, {
					headers: {
						Authorization: "Bearer " + user.token,
						"Content-Type": "application/json",
					},
				});
			} while (URIsToSend.length > 0);
			// If successful, update local
			if (res.status === 201) {
				user.log(`${playlist.name} is looking refreshed af.`, "end");
			} else {
				user.log(
					`Refreshing ${playlist.name} gave us an error. Not cool man.`,
					"error"
				);
			}
		} catch (err) {
			user.log(
				`Refreshing ${playlist.name} gave us an error. Not cool man.`,
				"error"
			);
			console.log(err);
		}
	}
}

export async function followPlaylists(listString) {
	const listArray = listString.split("\n");
	// Example format of one array element
	// https://open.spotify.com/playlist/7qJbIatA439sogHeQ0lOnS?si=qem5KAPzQ-2tD8RIVOf99A
	const idArray = listArray.map((url) => {
		const playlistIndex = url.indexOf("playlist");
		const questionmarkIndex = url.indexOf("?");
		return url.substring(playlistIndex + 9, questionmarkIndex);
	});

	user.log(`We're about to follow ${idArray.length} playlists.`, "start");
	for (var i = 0; i < idArray.length; i++) {
		const playlistId = idArray[i];
		console.log(playlistId);
		try {
			let res;
			// Remove old tracks
			const apiURL = `https://api.spotify.com/v1/playlists/${playlistId}/followers`;
			res = await axios.put(
				apiURL,
				{},
				{
					headers: {
						Authorization: "Bearer " + user.token,
						"Content-Type": "application/json",
					},
				}
			);

			// If successful, update local
			if (res.status === 200) {
				user.log(`${idArray[i]} has been followed.`);
			} else {
				user.log(
					`Following ${listArray[i]} gave us an error. Not cool man.`,
					"error"
				);
			}
		} catch (err) {
			user.log(
				`Following ${listArray[i]} gave us an error. Not cool man.`,
				"error"
			);
			console.log(err);
		}
	}
	user.log(`All done boss.`, "end");
}

export async function getFollowerCounts(listString) {
	let resultsArray = [];
	const listArray = listString.split("\n");
	// Example format of one array element
	// https://open.spotify.com/playlist/7qJbIatA439sogHeQ0lOnS?si=qem5KAPzQ-2tD8RIVOf99A
	const idArray = listArray.map((url) => {
		const playlistIndex = url.indexOf("playlist");
		let questionmarkIndex = url.indexOf("?");
		if (questionmarkIndex === -1) {
			questionmarkIndex = url.length;
		}
		return url.substring(playlistIndex + 9, questionmarkIndex);
	});

	user.log(
		`We're about to get follower counts from ${idArray.length} playlists.`,
		"start"
	);
	for (var i = 0; i < idArray.length; i++) {
		const playlistId = idArray[i];
		console.log(playlistId);
		try {
			let res;
			// Remove old tracks
			const apiURL = `https://api.spotify.com/v1/playlists/${playlistId}`;
			res = await axios.get(apiURL, {
				headers: {
					Authorization: "Bearer " + user.token,
					"Content-Type": "application/json",
				},
			});

			// If successful, update local
			console.log(res);
			if (res.status === 200) {
				user.log(`Got followers from ${idArray[i]}.`);
				resultsArray.push(res.data.followers.total);
			} else {
				user.log(
					`Getting followers from ${listArray[i]} gave us an error. Not cool man.`,
					"error"
				);
			}
		} catch (err) {
			user.log(
				`Getting followers from ${listArray[i]} gave us an error. Not cool man.`,
				"error"
			);
			console.log(err);
		}
	}
	user.log(`All done boss.`, "end");
	return resultsArray.join("\n");
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

import React, { forwardRef, useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';

import { view, autoEffect } from '@risingstack/react-easy-state';
import state from './../store';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
	Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
	Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
	Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
	Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
	DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
	Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
	Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
	Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
	FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
	LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
	NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
	PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
	ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
	Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
	SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
	ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
	ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const PlaylistTable = (props) => {
	const { token, user } = props;
	// const [playlists, setPlaylists] = useState(state.allPlaylists);

	let playlists = state.allPlaylists;

	useEffect(() => {
		console.log('render time');
		playlists = state.allPlaylists;
	});

	// Get data from storage or API on launch
	useEffect(() => {
		async function loadTable() {
			let nextLink;
			let newPlaylistsFromAPI = [];
			do {
				let res = await axios.get(nextLink || `https://api.spotify.com/v1/me/playlists?limit=50`, {
					headers: {
						Authorization: 'Bearer ' + token,
					},
				});
				console.log(res);
				let playlistBatch = res.data.items;
				for (const i in playlistBatch) {
					let playlist = playlistBatch[i];
					if (playlist.owner.id === user.id) {
						if (!state.allPlaylists.hasOwnProperty(playlist.id)) {
							state.allPlaylists[playlist.id] = {
								id: playlist.id,
								name: playlist.name,
								url: playlist.external_urls.spotify,
								tracks_endpoint: playlist.tracks.href,
								tracks: {},
								albumList: 'Loading...',
								albums: {},
							};
						}
					}
				}
				nextLink = res.data.next;
			} while (nextLink);

			const delayIncrement = 300;
			let currentDelay = -delayIncrement;
			for (const i in state.allPlaylists) {
				let playlist = state.allPlaylists[i];
				if (playlist.albumList === 'Loading...') {
					await delay(currentDelay);
					const [newTracks, newAlbums, newAlbumList] = await getTracksAndAlbums(playlist.id);
					// console.log(newTracks, newAlbums, newAlbumList);
					state.allPlaylists[i].tracks = newTracks;
					state.allPlaylists[i].albums = newAlbums;
					state.allPlaylists[i].albumList = newAlbumList;
					// currentDelay += delayIncrement;
				}
			}
		}
		// Get all user's playlists first, then determine if we need additional API calls
		loadTable();
	}, []);

	async function getTracksAndAlbums(id, delayms) {
		let nextLink;
		let APItracks = [];
		let tracks = {};
		let albums = {};
		let albumList = '';
		do {
			let res = await axios.get(nextLink || `https://api.spotify.com/v1/playlists/${id}/tracks?fields=`, {
				headers: {
					Authorization: 'Bearer ' + token,
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

	async function delay(ms) {
		await timeout(ms);
	}

	const timeout = (ms) => new Promise((res) => setTimeout(res, ms));

	return (
		<div style={{ maxWidth: '100%' }}>
			<MaterialTable
				columns={[
					// { title: 'Cover', field: 'cover' },
					{ title: 'Name', field: 'name' },
					{ title: 'Albums', field: 'albumList' },
				]}
				data={Object.values(playlists)}
				icons={tableIcons}
				options={{
					showTitle: false,
					selection: true,
					// paging: false,
					maxBodyHeight: '60vh',
					draggable: false,
					// actionsColumnIndex: -1,
				}}
				onSelectionChange={(rows) => (state.selectedPlaylists = rows)}
			/>
		</div>
	);
};

export default view(PlaylistTable);

import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
// import MaterialTable from "material-table";
import ReactDataGrid from "react-data-grid";
// import Chip from '@material-ui/core/Chip';
import axios from "axios";
// import { ReactSortable } from 'react-sortablejs';

import * as api from "./../api";

import { view } from "@risingstack/react-easy-state";
import { playlistArray, user } from "./../store";

const useStyles = makeStyles((theme) => ({
	root: {
		fontSize: 16,
	},
}));

const PlaylistTable = (props) => {
	const classes = useStyles();

	const [selectedIndexes, setSelectedIndexes] = useState([]);

	// Get data from storage or API on launch
	useEffect(() => {
		async function loadTable() {
			let nextLink;
			user.log(`Fetching all of ${user.name}'s playlists`);
			do {
				let res = await axios.get(
					nextLink ||
						`https://api.spotify.com/v1/me/playlists?limit=50`,
					{
						headers: {
							Authorization: "Bearer " + user.token,
						},
					}
				);
				// console.log(res);
				let playlistBatch = res.data.items;
				user.log(`Retrieved ${res.data.items.length} playlists`);
				for (const i in playlistBatch) {
					let playlist = playlistBatch[i];
					if (playlist.owner.id === user.id) {
						if (
							!user.allPlaylists.hasOwnProperty(playlist.id) &&
							user.filteredPlaylists.indexOf(playlist.id) === -1
						) {
							user.allPlaylists[playlist.id] = {
								id: playlist.id,
								name: playlist.name,
								url: playlist.external_urls.spotify,
								tracks_endpoint: playlist.tracks.href,
								description: decodeURIComponent(
									playlist.description
								),
								tracks: {},
								albumList: "Loading...",
								albums: [],
								lastUpdated: "Loading...",
								playlistMilliseconds: "Loading...",
							};
						}
					}
				}
				nextLink = res.data.next;
			} while (nextLink);

			const delayIncrement = 300;
			let currentDelay = -delayIncrement;
			for (const i in user.allPlaylists) {
				let playlist = user.allPlaylists[i];
				if (playlist.albumList === "Loading...") {
					await delay(currentDelay);
					const [
						newTracks,
						newAlbums,
						albumList,
						lastUpdated,
						playlistMilliseconds,
					] = await api.getPlaylistTracksAndAlbums(playlist.id);
					// console.log(newTracks, newAlbums, newAlbumList);
					if (newTracks) {
						user.allPlaylists[playlist.id].tracks = newTracks;
						user.allPlaylists[playlist.id].albums = newAlbums;
						user.allPlaylists[playlist.id].albumList = albumList;
						user.allPlaylists[
							playlist.id
						].lastUpdated = lastUpdated;
						user.allPlaylists[
							playlist.id
						].playlistMilliseconds = playlistMilliseconds;
					} else {
						user.log(`${playlist.name} was not relaxing enough.`);
						user.filteredPlaylists.push(playlist.id);
						delete user.allPlaylists[playlist.id];
					}

					// currentDelay += delayIncrement;
				}
			}
		}
		// Get all user's playlists first, then determine if we need additional API calls
		loadTable();
	}, []);

	async function delay(ms) {
		await timeout(ms);
	}

	const timeout = (ms) => new Promise((res) => setTimeout(res, ms));

	function handleDelete(name) {
		// Remove album from playlist
		console.log(name);
	}

	const playlistLengthFormatter = ({ value }) => {
		console.log(value);
		var ms = parseInt(value);
		var d, h, m, s;
		s = Math.floor(ms / 1000);
		m = Math.floor(s / 60);
		s = s % 60;
		h = Math.floor(m / 60);
		m = m % 60;
		d = Math.floor(h / 24);
		h = h % 24;
		h += d * 24;
		return `${h}:${m < 10 ? "0" + m : m}:${s < 10 ? "0" + s : s}`;
	};

	const columns = [
		{ key: "name", name: "Name" },
		{
			key: "playlistMilliseconds",
			name: "Total length",
			formatter: playlistLengthFormatter,
		},
		{ key: "lastUpdated", name: "Last updated" },
		{ key: "albumList", name: "Albums" },
	];

	const beans = [
		{
			name: "Cool",
			playlistMilliseconds: 500000,
			lastUpdated: "Yesterday",
			albumList: "Chill dude",
		},
		{
			name: "Cool",
			playlistMilliseconds: 500000,
			lastUpdated: "Yesterday",
			albumList: "Chill dude",
		},
		{
			name: "Cool",
			playlistMilliseconds: 500000,
			lastUpdated: "Yesterday",
			albumList: "Chill dude",
		},
		{
			name: "Cool",
			playlistMilliseconds: 500000,
			lastUpdated: "Yesterday",
			albumList: "Chill dude",
		},
		{
			name: "Cool",
			playlistMilliseconds: 500000,
			lastUpdated: "Yesterday",
			albumList: "Chill dude",
		},
		{
			name: "Cool",
			playlistMilliseconds: 500000,
			lastUpdated: "Yesterday",
			albumList: "Chill dude",
		},
		{
			name: "Cool",
			playlistMilliseconds: 500000,
			lastUpdated: "Yesterday",
			albumList: "Chill dude",
		},
		{
			name: "Cool",
			playlistMilliseconds: 500000,
			lastUpdated: "Yesterday",
			albumList: "Chill dude",
		},
	];

	function onRowsSelected(rows) {
		setSelectedIndexes(selectedIndexes.concat(rows.map((r) => r.rowIdx)));
	}

	function onRowsDeselected(rows) {
		let rowIndexes = rows.map((r) => r.rowIdx);
		setSelectedIndexes(
			selectedIndexes.filter((i) => rowIndexes.indexOf(i) === -1)
		);
	}

	return (
		<div className={classes.root}>
			<ReactDataGrid
				columns={columns}
				rowGetter={(i) => beans[i]}
				rowsCount={beans.length}
				minHeight={800}
				rowSelection={{
					showCheckbox: true,
					enableShiftSelect: true,
					onRowsSelected: onRowsSelected,
					onRowsDeselected: onRowsDeselected,
					selectBy: {
						indexes: selectedIndexes,
					},
				}}
			/>
		</div>
		// <div style={{ maxWidth: "100%" }}>
		// 	<MaterialTable
		// 		columns={[
		// 			{
		// 				title: "Name",
		// 				field: "name",
		// 				width: 250,
		// 				render: (rowData) => {
		// 					return (
		// 						<div>
		// 							<Typography variant="body2">
		// 								<strong>{rowData.name}</strong>
		// 							</Typography>
		// 							<Typography variant="subtitle2">
		// 								<em>{rowData.description}</em>
		// 							</Typography>
		// 						</div>
		// 					);
		// 				},
		// 			},
		// 			{
		// 				title: "Total length",
		// 				field: "playlistMilliseconds",
		// 				render: (rowData) => {
		// 					const ms = rowData.playlistMilliseconds;
		// 					if (ms === "Loading...") {
		// 						return "Loading...";
		// 					}
		// 					var d, h, m, s;
		// 					s = Math.floor(ms / 1000);
		// 					m = Math.floor(s / 60);
		// 					s = s % 60;
		// 					h = Math.floor(m / 60);
		// 					m = m % 60;
		// 					d = Math.floor(h / 24);
		// 					h = h % 24;
		// 					h += d * 24;
		// 					return `${h}:${m}:${s}`;
		// 				},
		// 			},
		// 			{
		// 				title: "Last updated",
		// 				field: "lastUpdated",
		// 				width: 150,
		// 				render: (rowData) => {
		// 					const now = Date.now().toString();
		// 					return `${Math.floor(
		// 						(now - rowData.lastUpdated) / 86400000
		// 					)} days ago`;
		// 				},
		// 			},
		// 			{
		// 				title: "Albums",
		// 				field: "albumList",
		// 				width: 600,
		// 			},
		// 		]}
		// 		data={playlistArray()}
		// 		icons={tableIcons}
		// 		options={{
		// 			showTitle: false,
		// 			selection: true,
		// 			paging: false,
		// 			pageSize: 20,
		// 			// maxBodyHeight: '52vh',
		// 			draggable: false,
		// 			headerStyle: {
		// 				fontWeight: "bold",
		// 			},
		// 			// actionsColumnIndex: -1,
		// 		}}
		// 		onSelectionChange={(rows) => (user.selectedPlaylists = rows)}
		// 		// onRowClick={(event, rowData, togglePanel) => togglePanel()}
		// 	/>
		// </div>
	);
};

export default view(PlaylistTable);

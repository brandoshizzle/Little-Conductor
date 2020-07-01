import React, { forwardRef, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import Chip from "@material-ui/core/Chip";
import axios from "axios";
import { ReactSortable } from "react-sortablejs";

import * as api from "./../api";

import { view } from "@risingstack/react-easy-state";
import { playlistArray, user } from "./../store";

import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";

const tableIcons = {
	Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
	Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
	Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
	Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
	DetailPanel: forwardRef((props, ref) => (
		<ChevronRight {...props} ref={ref} />
	)),
	Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
	Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
	Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
	FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
	LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
	NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
	PreviousPage: forwardRef((props, ref) => (
		<ChevronLeft {...props} ref={ref} />
	)),
	ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
	Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
	SortArrow: forwardRef((props, ref) => (
		<ArrowDownward {...props} ref={ref} />
	)),
	ThirdStateCheck: forwardRef((props, ref) => (
		<Remove {...props} ref={ref} />
	)),
	ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		justifyContent: "center",
		flexWrap: "wrap",
		listStyle: "none",
		padding: theme.spacing(0.5),
		margin: 0,
	},
	chip: {
		margin: theme.spacing(0.5),
	},
}));

const PlaylistTable = (props) => {
	const classes = useStyles();

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
					] = await api.getPlaylistTracksAndAlbums(playlist.id);
					// console.log(newTracks, newAlbums, newAlbumList);
					if (newTracks) {
						user.allPlaylists[playlist.id].tracks = newTracks;
						user.allPlaylists[playlist.id].albums = newAlbums;
						user.allPlaylists[playlist.id].albumList = albumList;
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

	return (
		<div style={{ maxWidth: "100%" }}>
			<MaterialTable
				columns={[
					{ title: "Name", field: "name", width: 250 },
					{ title: "Description", field: "description", width: 300 },
					{
						title: "Albums",
						field: "albumList",
					},
				]}
				data={playlistArray()}
				icons={tableIcons}
				options={{
					showTitle: false,
					selection: true,
					paging: false,
					pageSize: 20,
					// maxBodyHeight: '52vh',
					draggable: false,
					// actionsColumnIndex: -1,
				}}
				onSelectionChange={(rows) => (user.selectedPlaylists = rows)}
				// onRowClick={(event, rowData, togglePanel) => togglePanel()}
			/>
		</div>
	);
};

export default view(PlaylistTable);

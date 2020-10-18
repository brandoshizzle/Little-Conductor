import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import ReactDataGrid from "react-data-grid";
import * as api from "./../api";

import { view } from "@risingstack/react-easy-state";
import { user } from "./../store";

const useStyles = makeStyles((theme) => ({
	root: {
		fontSize: 14,
	},
}));

const sortRows = (initialRows, sortColumn, sortDirection) => (rows) => {
	const comparer = (a, b) => {
		if (sortDirection === "ASC") {
			return a[sortColumn] > b[sortColumn] ? 1 : -1;
		} else if (sortDirection === "DESC") {
			return a[sortColumn] < b[sortColumn] ? 1 : -1;
		}
	};
	return sortDirection === "NONE" ? initialRows : [...rows].sort(comparer);
};

const PlaylistTable = (props) => {
	const classes = useStyles();

	const [tableWidth, setTableWidth] = useState(500);
	const [sortedAllPlaylists, setSortedAllPlaylists] = useState(
		user.allPlaylists
	);
	const [rows, setRows] = useState(user.allPlaylists);

	useEffect(() => {
		// Get data from storage or API on launch
		const w = window.innerWidth;
		setTableWidth(w - 520);
		window.addEventListener("resize", function () {
			const w = window.innerWidth;
			setTableWidth(w - 520);
		});
		api.loadTable();
	}, []);

	useEffect(() => {
		console.log(props.search.length);
		if (props.search.length > 2) {
			const newPlaylists = sortedAllPlaylists.filter((playlistInfo) => {
				console.log(playlistInfo.name);
				console.log(
					playlistInfo.name.indexOf(props.search.toLowerCase())
				);
				return (
					playlistInfo.name
						.toLowerCase()
						.indexOf(props.search.toLowerCase()) > -1 ||
					playlistInfo.albumsString
						.toLowerCase()
						.indexOf(props.search.toLowerCase()) > -1
				);
			});
			console.log(newPlaylists);
			setRows(newPlaylists);
		} else {
			setRows(sortedAllPlaylists);
		}
	}, [props.search, sortedAllPlaylists]);

	const playlistLengthFormatter = ({ value }) => {
		// console.log(value);
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
		return `${h < 10 ? "0" + h : h}:${m < 10 ? "0" + m : m}:${
			s < 10 ? "0" + s : s
		}`;
	};

	const lastUpdatedFormatter = ({ value }) => {
		const now = Date.now().toString();
		const days = Math.floor((now - value) / 86400000);
		const word = days === 1 ? "day" : "days";
		return `${days} ${word} ago`;
	};

	const nameFormatter = ({ value }) => {
		return (
			<Tooltip title={value} placement="bottom">
				<div className="no-overflow">{value}</div>
			</Tooltip>
		);
	};

	const columns = [
		{
			key: "name",
			name: "Name",
			width: 300,
			sortable: true,
			resizable: true,
			formatter: nameFormatter,
		},
		{
			key: "playlistMilliseconds",
			name: "Total length",
			formatter: playlistLengthFormatter,
			width: 100,
		},
		{
			key: "lastUpdated",
			name: "Last updated",
			formatter: lastUpdatedFormatter,
			width: 120,
			sortable: true,
		},
		{
			key: "albumsString",
			name: "Albums",
			resizable: true,
			formatter: nameFormatter,
		},
	];

	function onRowsSelected(rows) {
		console.log(rows);
		user.selectedPlaylists.push(rows[0].row.id);
		// setSelectedIds(selectedIds.concat(rows.map((r) => r.row.id)));
	}

	function onRowsDeselected(rows) {
		user.selectedPlaylists = user.selectedPlaylists.filter(
			(e) => e !== rows[0].row.id
		);
		// let rowIds = rows.map((r) => r.row.id);
		// setSelectedIds(selectedIds.filter((i) => rowIds.indexOf(i) === -1));
	}

	return (
		<div className={classes.root}>
			<ReactDataGrid
				columns={columns}
				rowGetter={(i) => rows[i]}
				rowsCount={rows.length}
				minHeight={800}
				minWidth={tableWidth}
				rowSelection={{
					showCheckbox: true,
					enableShiftSelect: true,
					onRowsSelected: onRowsSelected,
					onRowsDeselected: onRowsDeselected,
					selectBy: {
						keys: {
							rowKey: "id",
							values: user.selectedPlaylists,
						},
					},
				}}
				onGridSort={(sortColumn, sortDirection) => {
					setSortedAllPlaylists(
						sortRows(user.allPlaylists, sortColumn, sortDirection)
					);
				}}
			/>
		</div>
	);
};

export default view(PlaylistTable);

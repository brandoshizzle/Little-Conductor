import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";

import AlbumList from "./AlbumList";
import PlaylistTable from "./PlaylistTable";
import ActionButtons from "./ActionButtons";
import AlbumChips from "./AlbumChips";

import Logger from "./Logger";
import { user } from "./../store";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: "left",
		color: theme.palette.text.secondary,
		height: "calc(100vh - 60px)",
		backgroundColor: "rgba(240,240,240,0.7)",
	},
}));

const PlaylistAlbumsPage = (props) => {
	const { token } = props;
	const classes = useStyles();
	const sidebarWidth = 250;
	const [search, setSearch] = useState("");

	const handleSearchChange = (event) => {
		setSearch(event.target.value);
	};

	useEffect(() => {
		user.selectedPlaylists = [];
	}, []);

	return (
		<div className={classes.root}>
			<div
				style={{
					position: "fixed",
					width: sidebarWidth,
					top: 55,
					left: 5,
				}}>
				<Paper className={classes.paper} style={{ padding: 10 }}>
					<AlbumList token={token} />
					<AlbumChips />
					<ActionButtons token={token} />
				</Paper>
			</div>
			<div
				style={{
					position: "absolute",
					marginRight: 10,
					left: sidebarWidth + 10,
					top: 55,
				}}>
				<TextField
					id="outlined-basic"
					label="Search"
					variant="outlined"
					style={{
						float: "right",
						background: "rgba(250,250,250,0.7)",
						marginBottom: 10,
					}}
					onChange={handleSearchChange}
					value={search}
				/>
				<PlaylistTable token={token} search={search} />
			</div>
			<div
				style={{
					position: "fixed",
					height: "100vh",
					width: sidebarWidth,
					top: 50,
					right: 0,
				}}>
				<Logger />
			</div>
		</div>
	);
};

export default PlaylistAlbumsPage;

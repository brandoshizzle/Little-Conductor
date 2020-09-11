import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

import AlbumList from "./AlbumList";
import PlaylistTable from "./PlaylistTable";
import ActionButtons from "./ActionButtons";
import AlbumChips from "./AlbumChips";

import Logger from "./Logger";

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
	return (
		<div className={classes.root}>
			<div
				style={{
					position: "fixed",
					// height: "calc(100vh-60px)",
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
					width: "66%",
					top: 55,
				}}>
				<PlaylistTable token={token} />
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

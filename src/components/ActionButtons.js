import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import * as api from "./../api";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";

import HelpDialog from "./HelpDialog";

import { view } from "@risingstack/react-easy-state";
import { user } from "./../store";

const useStyles = makeStyles((theme) => ({
	bg: {
		background: theme.palette.background.paper,
	},
	root: {
		display: "flex",
		flexWrap: "wrap",
		justifyContent: "flex-start",
	},
	item: {
		margin: 0,
		marginRight: 2,
		marginBottom: 2,
	},
	progressBox: {
		width: "100%",
		display: "flex",
		alignItems: "center",
	},
	progress: {
		flexGrow: "1",
	},
}));

const ActionButtons = (props) => {
	const classes = useStyles();
	const [desc, setDesc] = useState("");
	const [helpOpen, setHelpOpen] = useState(false);

	function descChange(e) {
		setDesc(e.target.value);
	}

	const handleDialogClose = () => {
		setHelpOpen(false);
		console.log(helpOpen);
	};

	return (
		<div>
			<div className={classes.root}>
				<div className={classes.progressBox}>
					{/* <Typography variant="body1">Current Task</Typography> */}
					<LinearProgress
						variant="determinate"
						value={user.progress.percent}
						color="secondary"
						className={classes.progress}
						style={{ display: "none" }}
					/>
				</div>
				<Typography
					variant="body1"
					style={{ flexBasis: "100%", paddingTop: 5 }}>
					Add Albums to
				</Typography>
				<Button
					variant="contained"
					color="primary"
					className={classes.item}
					onClick={() => {
						api.addAlbums("start");
					}}
					size="small">
					start
				</Button>
				<Button
					variant="contained"
					color="primary"
					className={classes.item}
					onClick={() => {
						api.addAlbums("end");
					}}
					size="small">
					end
				</Button>
				<Button
					variant="contained"
					color="primary"
					className={classes.item}
					onClick={() => {
						api.addAlbums("start", "replace");
					}}
					size="small">
					Replace
				</Button>

				<Typography
					variant="body1"
					style={{ flexBasis: "100%", paddingTop: 5 }}>
					Playlist Actions
				</Typography>
				<div style={{ textAlign: "left" }}>
					<input
						id="new-description"
						placeholder="Description"
						onChange={descChange}
						style={{ width: "120px", padding: 5 }}
						type="text"
					/>
					<Button
						variant="contained"
						color="primary"
						className={classes.item}
						onClick={() => {
							api.replaceDescription(desc);
						}}
						size="small">
						Replace
					</Button>
					<Button
						variant="contained"
						color="primary"
						className={classes.item}
						onClick={() => {
							api.refreshPlaylists();
						}}
						size="small">
						refresh albums
					</Button>
				</div>
				{/* <Button
					variant="contained"
					color="primary"
					className={classes.item}>
					Add to start and push last album
				</Button> */}

				<Typography
					variant="body1"
					style={{ flexBasis: "100%", paddingTop: 5 }}>
					Utility
				</Typography>
				<Button
					variant="contained"
					color="primary"
					className={classes.item}
					onClick={() => {
						localStorage.setItem("token", "");
						user.log(
							"Spotify token has been cleared. Please refresh your webpage.",
							"end"
						);
					}}
					size="small">
					Re-spotify
				</Button>
				<Button
					variant="contained"
					color="primary"
					className={classes.item}
					onClick={() => {
						localStorage.clear();
						user.allPlaylists = [];
						user.log(
							"All playlist data has been cleared. Please hard refresh (Shift + F5) your webpage.",
							"end"
						);
					}}
					size="small">
					RESET PROGRAM
				</Button>
				<Button
					variant="contained"
					color="primary"
					className={classes.item}
					onClick={() => {
						setHelpOpen(true);
					}}
					size="small">
					It's not working!
				</Button>
				<HelpDialog open={helpOpen} onClose={handleDialogClose} />
			</div>
		</div>
	);
};

export default view(ActionButtons);

import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import * as api from "./../api";
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

const UtilitiesAlbumPage = (props) => {
	const { token } = props;
	const classes = useStyles();
	const sidebarWidth = 250;

	const [followList, setFollowList] = React.useState("");
	const [statsToGetList, setStatsToGetList] = React.useState("");
	const [resultsListString, setResultsListString] = React.useState("");

	const handleFollowListChange = (event) => {
		setFollowList(event.target.value);
	};
	const handleFollowStatsChange = (event) => {
		setStatsToGetList(event.target.value);
	};

	async function getFollowers() {
		console.log("starting");
		const results = await api.getFollowerCounts(statsToGetList);
		console.log(results);
		setResultsListString(results);
	}

	return (
		<div className={classes.root}>
			<div style={{ width: "30%", display: "inline-block" }}>
				<form noValidate autoComplete="off">
					<div>
						<Paper style={{ width: "10%", minWidth: 200 }}>
							<TextField
								id="outlined-multiline-static"
								label="Playlists to Follow"
								multiline
								rows={20}
								defaultValue=""
								variant="outlined"
								onChange={handleFollowListChange}
							/>
						</Paper>
					</div>
				</form>
				<Button
					style={{ display: "block", marginTop: 10 }}
					variant="contained"
					color="primary"
					onClick={() => {
						api.followPlaylists(followList);
					}}
					size="small">
					Follow playlists
				</Button>
			</div>
			<div style={{ width: "50%", display: "inline-block" }}>
				<form
					noValidate
					autoComplete="off"
					style={{ display: "inline-block" }}>
					<div>
						<Paper style={{ width: "10%", minWidth: 200 }}>
							<TextField
								id="outlined-multiline-static"
								label="Get follow stats"
								multiline
								rows={20}
								defaultValue=""
								variant="outlined"
								onChange={handleFollowStatsChange}
							/>
						</Paper>
					</div>
				</form>
				<form
					noValidate
					autoComplete="off"
					style={{ display: "inline-block" }}>
					<div>
						<Paper style={{ width: "10%", minWidth: 200 }}>
							<TextField
								id="follower-results"
								label="Results appear here"
								multiline
								rows={20}
								variant="outlined"
								value={resultsListString}
							/>
						</Paper>
					</div>
				</form>
				<Button
					style={{ display: "block", marginTop: 10 }}
					variant="contained"
					color="primary"
					onClick={() => {
						getFollowers();
					}}
					size="small">
					Get follow counts
				</Button>
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

export default UtilitiesAlbumPage;

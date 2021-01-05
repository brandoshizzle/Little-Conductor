import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import * as api from "./../api/api";
import Logger from "./Logger";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		display: "flex",
		flexDirection: "row",
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: "left",
		color: theme.palette.text.secondary,
		height: "calc(100vh - 60px)",
		backgroundColor: "rgba(240,240,240,0.7)",
	},
}));

const LSRPage = (props) => {
	const classes = useStyles();
	const sidebarWidth = 250;

	const [playlistList, setPlaylistList] = React.useState("");
	// const [resultsListString, setResultsListString] = React.useState("");

	const handlePlaylistListChange = (event) => {
		setPlaylistList(event.target.value);
	};

	return (
		<div className={classes.root}>
			<div style={{ width: 600 }}>
				<form
					noValidate
					autoComplete="off"
					style={{ display: "inline-block" }}>
					<div>
						<Paper style={{ width: 250 }}>
							<TextField
								id="outlined-multiline-static"
								label="Playlist URIs"
								multiline
								rows={20}
								defaultValue=""
								variant="outlined"
								onChange={handlePlaylistListChange}
								style={{ width: 250 }}
							/>
						</Paper>
					</div>
				</form>
				<form
					noValidate
					autoComplete="off"
					style={{ display: "inline-block" }}>
					<div>
						<Paper style={{ width: 250 }}>
							<TextField
								id="results"
								label="Results"
								multiline
								rows={20}
								defaultValue=""
								variant="outlined"
								style={{ width: 250 }}
							/>
						</Paper>
					</div>
				</form>
				<Button
					style={{ display: "block", marginTop: 10 }}
					variant="contained"
					color="primary"
					onClick={() => {
						api.getPlaypastingData(playlistList);
					}}
					size="small">
					Get Playpasting Data
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

export default LSRPage;

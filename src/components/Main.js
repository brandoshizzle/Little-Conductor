import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import useAxios from "axios-hooks";
import Typography from "@material-ui/core/Typography";

import { view } from "@risingstack/react-easy-state";
import { user } from "./../store";

import PlaylistAlbumsPage from "./PlaylistAlbumsPage";
import LSRPage from "./LSRPage";
import UtilitiesPage from "./UtilitiesPage";

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}>
			{value === index && <Box p={3}>{children}</Box>}
		</div>
	);
}

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
	};
}

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		height: "calc(100vh - 48px)",
		// backgroundColor: theme.palette.background.paper,
	},
}));

const Main = (props) => {
	const classes = useStyles();
	const { token } = props;
	const [value, setValue] = useState(0);
	const [tokenTimeout, setTokenTimout] = useState(user.tokenms - Date.now());

	useEffect(() => {
		const tokenTimeoutInterval = setInterval(() => {
			setTokenTimout(user.tokenms - Date.now());
			if (tokenTimeout < 1000) {
				try {
					tokenTimeoutInterval.clear();
				} catch (e) {
					console.log("Tried to clear interval, could not. Oh well.");
				}
			}
		}, 60000);
	}, []);

	const [{ data, loading, error }] = useAxios({
		url: "https://api.spotify.com/v1/me",
		method: "GET",
		headers: {
			Authorization: "Bearer " + token,
		},
	});

	if (loading) {
		console.log("Loading user...");
	}

	if (data) {
		// console.log(data);
		user.name = data.display_name;
		user.id = data.id;
	}

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	if (user.id !== "") {
		return (
			<div className={classes.root}>
				{/* <div style={{ display: 'flex' }}> */}
				<AppBar position="static" style={{ width: "100%" }}>
					<Tabs
						value={value}
						onChange={handleChange}
						aria-label="simple tabs example"
						style={{ width: "75%" }}>
						<Tab label="Playlist Tools" {...a11yProps(0)} />
						<Tab label="LSR" {...a11yProps(1)} />
						<Tab label="Utilities" {...a11yProps(2)} />
					</Tabs>
					<div style={{ position: "absolute", top: 10, right: 10 }}>
						<Typography variant="h5">
							Spotify access expires in:{" "}
							{Math.ceil(tokenTimeout / 1000 / 60)} mins
						</Typography>
					</div>
				</AppBar>
				{/* </div> */}
				<TabPanel value={value} index={0} style={{ height: "100%" }}>
					<PlaylistAlbumsPage token={token} />
				</TabPanel>
				<TabPanel value={value} index={1}>
					<LSRPage token={token} />
				</TabPanel>
				<TabPanel value={value} index={2}>
					<UtilitiesPage token={token} />
				</TabPanel>
			</div>
		);
	}

	if (error) {
		return (
			<div>
				<p>
					If you're seeing this, click this button, then refresh the
					page.
				</p>
				<Button
					variant="contained"
					color="primary"
					onClick={() => {
						localStorage.setItem("token", "");
					}}>
					Clear Token
				</Button>
			</div>
		);
	}

	return (
		<div>
			<p>Loading...</p>
		</div>
	);
};

export default view(Main);

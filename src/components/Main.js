import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import useAxios from 'axios-hooks';

import { view } from '@risingstack/react-easy-state';
import { user } from './../store';

import PlaylistAlbumsPage from './PlaylistAlbumsPage';

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && <Box p={3}>{children}</Box>}
		</div>
	);
}

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		// backgroundColor: theme.palette.background.paper,
	},
}));

const Main = (props) => {
	const classes = useStyles();
	const { token } = props;
	const [value, setValue] = useState(0);

	const [{ data, loading, error }, refetch] = useAxios({
		url: 'https://api.spotify.com/v1/me',
		method: 'GET',
		headers: {
			Authorization: 'Bearer ' + token,
		},
	});

	if (data) {
		console.log(data);
		user.name = data.display_name;
		user.id = data.id;
	}

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	if (user.id !== '') {
		return (
			<div className={classes.root}>
				<AppBar position="static">
					<Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
						<Tab label="Playlist Albums" {...a11yProps(0)} />
						<Tab label="Nothing... for now" {...a11yProps(1)} />
					</Tabs>
				</AppBar>
				<TabPanel value={value} index={0}>
					<PlaylistAlbumsPage token={token} />
				</TabPanel>
				<TabPanel value={value} index={1}>
					Item Two
				</TabPanel>
			</div>
		);
	}

	if (error) {
		return (
			<div>
				<p>If you're seeing this, click this button.</p>
				<Button
					variant="contained"
					color="primary"
					onClick={() => {
						localStorage.setItem('token', '');
					}}
				>
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

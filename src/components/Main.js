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
import UtilitiesPage from './UtilitiesPage';

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
		height: 'calc(100vh - 48px)',
		// backgroundColor: theme.palette.background.paper,
	},
}));

const Main = (props) => {
	const classes = useStyles();
	const { token } = props;
	const [value, setValue] = useState(0);

	const [{ data, loading, error }] = useAxios({
		url: 'https://api.spotify.com/v1/me',
		method: 'GET',
		headers: {
			Authorization: 'Bearer ' + token,
		},
	});

	if (loading) {
		console.log('Loading user...');
	}

	if (data) {
		// console.log(data);
		user.name = data.display_name;
		user.id = data.id;
	}

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	if (user.id !== '') {
		return (
			<div className={classes.root}>
				{/* <div style={{ display: 'flex' }}> */}
				<AppBar position="static" style={{ width: '100%' }}>
					<Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
						<Tab label="Playlist Tools" {...a11yProps(0)} />
						<Tab label="Utilities" {...a11yProps(1)} />
					</Tabs>
				</AppBar>
				{/* </div> */}
				<TabPanel value={value} index={0} style={{ height: '100%' }}>
					<PlaylistAlbumsPage token={token} />
				</TabPanel>
				<TabPanel value={value} index={1}>
					<UtilitiesPage token={token} />
				</TabPanel>
			</div>
		);
	}

	if (error) {
		return (
			<div>
				<p>If you're seeing this, click this button, then refresh the page.</p>
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

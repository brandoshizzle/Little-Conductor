import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import * as api from './../api';
import LinearProgress from '@material-ui/core/LinearProgress';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { view } from '@risingstack/react-easy-state';
import { user } from './../store';

const useStyles = makeStyles((theme) => ({
	bg: {
		background: theme.palette.background.paper,
	},
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'flex-start',
	},
	item: {
		margin: 5,
	},
	progressBox: {
		width: '100%',
		display: 'flex',
		alignItems: 'center',
	},
	progress: {
		flexGrow: '1',
	},
}));

const ActionButtons = (props) => {
	const classes = useStyles();
	const [desc, setDesc] = useState('');

	function descChange(e) {
		setDesc(e.target.value);
	}

	return (
		<div>
			<div className={classes.root}>
				<div className={classes.progressBox}>
					<Typography variant="body1">Current Task</Typography>
					<LinearProgress
						variant="determinate"
						value={user.progress.percent}
						color="secondary"
						className={classes.progress}
					/>
				</div>
				<Button
					variant="contained"
					color="primary"
					className={classes.item}
					onClick={() => {
						api.addAlbums('start');
					}}
				>
					Add to start
				</Button>
				<Button
					variant="contained"
					color="primary"
					className={classes.item}
					onClick={() => {
						api.addAlbums('end');
					}}
				>
					Add to end
				</Button>
				<Button variant="contained" color="primary" className={classes.item}>
					Add to start and push last album
				</Button>
				<Button
					variant="contained"
					color="primary"
					className={classes.item}
					onClick={() => {
						localStorage.setItem('token', '');
					}}
				>
					Clear Token
				</Button>
				<Button
					variant="contained"
					color="primary"
					className={classes.item}
					onClick={() => {
						localStorage.removeItem('user');
					}}
				>
					Reload all playlists
				</Button>
			</div>
			<div style={{ textAlign: 'left' }}>
				<TextField id="new-description" label="Description" onChange={descChange} style={{ width: '60%' }} />
				<Button
					variant="contained"
					color="primary"
					className={classes.item}
					onClick={() => {
						api.replaceDescription(desc);
					}}
				>
					Replace description
				</Button>
			</div>
		</div>
	);
};

export default view(ActionButtons);

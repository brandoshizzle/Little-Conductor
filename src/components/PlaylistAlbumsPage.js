import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import AlbumList from './AlbumList';
import PlaylistTable from './PlaylistTable';
import ActionButtons from './ActionButtons';
import AlbumChips from './AlbumChips';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'left',
		color: theme.palette.text.secondary,
		height: '95vh',
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
					position: 'fixed',
					height: '100vh',
					width: sidebarWidth,
					top: 50,
					left: 0,
				}}
			>
				<Paper className={classes.paper}>
					<AlbumList token={token} />
					<AlbumChips />
					<ActionButtons token={token} />
				</Paper>
			</div>
			<div style={{ position: 'absolute', marginRight: 10, left: sidebarWidth + 10 }}>
				<PlaylistTable token={token} />
			</div>
		</div>
	);
};

export default PlaylistAlbumsPage;

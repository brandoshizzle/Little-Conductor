import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import AlbumList from './AlbumList';
import PlaylistTable from './PlaylistTable';
import ActionButtons from './ActionButtons';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'left',
		color: theme.palette.text.secondary,
	},
}));

const PlaylistAlbumsPage = (props) => {
	const { token } = props;
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Grid container spacing={3}>
				<Grid item xs={3}>
					{/* <Typography component="h5">Albums</Typography> */}
					<Paper className={classes.paper}>
						<AlbumList token={token} />
					</Paper>
				</Grid>
				<Grid item xs={9}>
					{/* <Typography component="h5">Playlists</Typography> */}
					<PlaylistTable token={token} />
				</Grid>
				<Grid item xs={12}>
					<ActionButtons token={token} />
				</Grid>
			</Grid>
		</div>
	);
};

export default PlaylistAlbumsPage;

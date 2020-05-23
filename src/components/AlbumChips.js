import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';

import { view } from '@risingstack/react-easy-state';
import { user } from './../store';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		justifyContent: 'center',
		flexWrap: 'wrap',
		listStyle: 'none',
		padding: theme.spacing(0.5),
		margin: 0,
	},
	chip: {
		margin: theme.spacing(0.5),
	},
}));

const AlbumChips = () => {
	const classes = useStyles();
	const handleDelete = (chipToDelete) => () => {
		user.selectedAlbums = user.selectedAlbums.filter((chip) => chip !== chipToDelete);
	};

	return (
		<Paper component="ul" className={classes.root}>
			{user.selectedAlbums.map((albumID, index) => {
				let icon;

				return (
					<li key={index}>
						<Chip
							icon={icon}
							label={user.allAlbums[albumID].name}
							onDelete={handleDelete(albumID)}
							className={classes.chip}
						/>
					</li>
				);
			})}
		</Paper>
	);
};

export default view(AlbumChips);

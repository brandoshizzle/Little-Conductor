import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import useAxios from 'axios-hooks';
import { view } from '@risingstack/react-easy-state';
import { user } from './../store';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		backgroundColor: theme.palette.background.paper,
	},
	list: {
		position: 'relative',
		overflow: 'auto',
		maxHeight: '65vh',
	},
}));

const AlbumList = (props) => {
	const classes = useStyles();
	const { token } = props;
	const [selectedIndex, setSelectedIndex] = useState(0);

	const [{ data, loading, error }] = useAxios({
		url: 'https://api.spotify.com/v1/artists/4SCWiQbJCMTHK737aNUqBJ/albums?offset=0&limit=20&market=CA',
		method: 'GET',
		headers: {
			Authorization: 'Bearer ' + token,
		},
	});

	const handleListItemClick = (event, index) => {
		setSelectedIndex(index);
		user.album = data.items[index];
	};
	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error!</p>;

	return (
		<div className={classes.root}>
			<List className={classes.list} component="nav" aria-label="main mailbox folders">
				{data.items.map((album, i) => (
					<ListItem
						button
						selected={selectedIndex === i}
						onClick={(event) => handleListItemClick(event, i)}
						key={album.id}
					>
						<ListItemAvatar>
							<Avatar variant="square">
								<img src={album.images[1].url} alt="cover" />
							</Avatar>
						</ListItemAvatar>
						<ListItemText primary={album.name} />
					</ListItem>
				))}
			</List>
		</div>
	);
};

export default view(AlbumList);

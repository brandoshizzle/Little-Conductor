import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import { ReactSortable } from "react-sortablejs";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import * as api from "../api/api";
import SpotifySquare from "./../img/spotify-square.png";

import { view } from "@risingstack/react-easy-state";
import { user } from "./../store";

const useStyles = makeStyles((theme) => ({
	root: {
		width: 400,
	},
	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
	modal: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
}));

const RearrangeModal = (props) => {
	const classes = useStyles();
	const [albums, setAlbums] = useState([]);

	useEffect(() => {
		const albumsInfo = [];
		console.log(props.playlist);
		if (Object.keys(props.playlist).length > 0) {
			props.playlist.albums.map((album, i) => {
				if (user.allAlbums.hasOwnProperty(album.id)) {
					albumsInfo.push(user.allAlbums[album.id]);
				} else {
					albumsInfo.push({
						id: album.id,
						name: album.name,
						images: [{}, { url: SpotifySquare }],
					});
				}
			});
			setAlbums(albumsInfo);
			console.log(albumsInfo);
		}
	}, [props.playlist]);

	const onSave = async () => {
		const oldSelection = user.selectedAlbums;
		const oldPlaylistSelection = user.selectedPlaylists;
		const newSelection = [];
		albums.forEach((a) => {
			newSelection.push(a.id);
		});
		user.selectedAlbums = newSelection;
		user.selectedPlaylists = [props.playlist.id];
		await api.addSelectedAlbumsToSelectedPlaylist("end", "replace");
		user.selectedAlbums = oldSelection;
		user.selectedPlaylists = oldPlaylistSelection;
		props.close();
	};

	return (
		<Modal
			className={classes.modal}
			open={props.open}
			onClose={props.close}
			aria-labelledby="simple-modal-title"
			aria-describedby="simple-modal-description">
			<Card className={classes.root}>
				<CardContent>
					<Typography
						variant="h2"
						component="h2"
						className={classes.title}
						gutterBottom>
						{props.playlist.name}
					</Typography>
					<List style={{ overflowY: "scroll", maxHeight: 500 }}>
						<ReactSortable
							list={albums}
							setList={setAlbums}
							animation={200}>
							{albums &&
								albums.map((album) => (
									<ListItem
										button
										key={album.id}
										style={{
											paddingLeft: 0,
											paddingBottom: 0,
											paddingTop: 0,
										}}>
										<ListItemAvatar>
											<Avatar
												variant="square"
												src={
													album.images[1].url
												}></Avatar>
										</ListItemAvatar>
										<ListItemText
											primary={album.name}
											secondary={"beans"}
										/>
									</ListItem>
								))}
						</ReactSortable>
					</List>
				</CardContent>
				<CardActions style={{ float: "right" }}>
					<Button onClick={props.close}>Cancel</Button>
					<Button
						variant="contained"
						color="primary"
						onClick={onSave}>
						Save
					</Button>
				</CardActions>
			</Card>
		</Modal>
	);
};

export default view(RearrangeModal);

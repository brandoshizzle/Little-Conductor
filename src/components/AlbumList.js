import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
// import useAxios from 'axios-hooks';
import axios from "axios";
import { view } from "@risingstack/react-easy-state";
import { user } from "./../store";
import { getUserAlbumsFromSpotify } from "../api/utilities";

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		backgroundColor: theme.palette.background.paper,
		paddingLeft: 10,
	},
	list: {
		position: "relative",
		overflow: "auto",
		maxHeight: "50vh",
	},
}));

Object.filter = (obj, predicate) =>
	Object.keys(obj)
		.filter((key) => predicate(obj[key]))
		.reduce((res, key) => ((res[key] = obj[key]), res), {});

const AlbumList = (props) => {
	const classes = useStyles();

	useEffect(() => {
		// Get all LS albums
		getUserAlbumsFromSpotify();
		user.selectedAlbums = [];
	}, []);

	const handleListItemClick = (event, id) => {
		if (user.selectedAlbums.indexOf(id) > -1) {
			const newSelectedAlbums = user.selectedAlbums.filter(
				(item) => item !== id
			);
			user.selectedAlbums = newSelectedAlbums;
		} else {
			user.selectedAlbums = user.selectedAlbums.concat(id);
		}
	};

	return (
		<div className={classes.root}>
			<List
				className={classes.list}
				component="nav"
				aria-label="main mailbox folders">
				<Typography variant="body1">Releases</Typography>
				{user.allAlbums &&
					Object.values(
						Object.filter(
							user.allAlbums,
							(album) => album.album_type === "album"
						)
					).map((album, i) => {
						const rDate = new Date(album.release_date);
						return (
							<ListItem
								button
								selected={
									user.selectedAlbums.indexOf(album.id) > -1
								}
								onClick={(event) =>
									handleListItemClick(event, album.id)
								}
								key={album.id}
								style={{
									paddingLeft: 0,
									paddingBottom: 0,
									paddingTop: 0,
								}}>
								<ListItemAvatar>
									<Avatar
										variant="square"
										src={album.images[1].url}></Avatar>
								</ListItemAvatar>
								<ListItemText
									primary={album.name}
									secondary={rDate.toLocaleDateString(
										"en-US",
										{
											year: "numeric",
											month: "long",
											day: "numeric",
										}
									)}
								/>
							</ListItem>
						);
					})}
				<Typography variant="body1">Singles</Typography>
				{user.allAlbums &&
					Object.values(
						Object.filter(
							user.allAlbums,
							(album) => album.album_type === "single"
						)
					).map((album, i) => {
						const rDate = new Date(album.release_date);
						return (
							<ListItem
								button
								selected={
									user.selectedAlbums.indexOf(album.id) > -1
								}
								onClick={(event) =>
									handleListItemClick(event, album.id)
								}
								key={album.id}
								style={{
									paddingLeft: 0,
									paddingBottom: 0,
									paddingTop: 0,
								}}>
								<ListItemAvatar>
									<Avatar
										variant="square"
										src={album.images[1].url}></Avatar>
								</ListItemAvatar>
								<ListItemText
									primary={album.name}
									secondary={rDate.toLocaleDateString(
										"en-US",
										{
											year: "numeric",
											month: "long",
											day: "numeric",
										}
									)}
								/>
							</ListItem>
						);
					})}
			</List>
		</div>
	);
};

export default view(AlbumList);

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";

import { view } from "@risingstack/react-easy-state";
import { user } from "./../store";
import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		justifyContent: "center",
		flexWrap: "wrap",
		listStyle: "none",
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
		user.selectedAlbums = user.selectedAlbums.filter(
			(chip) => chip !== chipToDelete
		);
	};

	return (
		<Paper component="ul" className={classes.root}>
			{user.selectedAlbums.map((albumID, index) => {
				return (
					<li key={index}>
						<Tooltip
							title={user.allAlbums[albumID].name}
							placement="top">
							<Chip
								// label={user.allAlbums[albumID].name}
								onClick={handleDelete(albumID)}
								className={classes.chip}
								size="small"
								avatar={
									<Avatar
										src={
											user.allAlbums[albumID].images[1]
												.url
										}
									/>
								}
							/>
						</Tooltip>
					</li>
				);
			})}
		</Paper>
	);
};

export default view(AlbumChips);

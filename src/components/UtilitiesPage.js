import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';

import Logger from './Logger';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'left',
		color: theme.palette.text.secondary,
		height: 'calc(100vh - 60px)',
		backgroundColor: 'rgba(240,240,240,0.7)',
	},
}));

const UtilitiesAlbumPage = (props) => {
	const { token } = props;
	const classes = useStyles();
	const sidebarWidth = 250;

	const [followList, setFollowList] = React.useState('');

	const handleChange = (event) => {
		setFollowList(event.target.value);
	};

	return (
		<div className={classes.root}>
			<div>
				<form noValidate autoComplete="off">
					<div>
						<Paper style={{ width: '10%', minWidth: 200 }}>
							<TextField
								id="outlined-multiline-static"
								label="Playlists to Follow"
								multiline
								rows={20}
								defaultValue=""
								variant="outlined"
								onChange={handleChange}
							/>
						</Paper>
					</div>
				</form>
			</div>
			<div>
				<form noValidate autoComplete="off">
					<div>
						<Paper style={{ width: '10%', minWidth: 200 }}>
							<TextField
								id="outlined-multiline-static"
								label="Playlists to Follow"
								multiline
								rows={20}
								defaultValue=""
								variant="outlined"
								onChange={handleChange}
							/>
						</Paper>
					</div>
				</form>
			</div>
			<div
				style={{
					position: 'fixed',
					height: '100vh',
					width: sidebarWidth,
					top: 50,
					right: 0,
				}}
			>
				<Logger />
			</div>
		</div>
	);
};

export default UtilitiesAlbumPage;

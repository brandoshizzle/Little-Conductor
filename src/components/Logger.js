import React, { useState, useEffect } from 'react';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/MenuOpen';
import Typography from '@material-ui/core/Typography';

import { view } from '@risingstack/react-easy-state';
import { user } from './../store';

const Logger = (props) => {
	const [panelHeight, setPanelHeight] = useState(48);
	const [overflow, setOverflow] = useState('hidden');

	function expand() {
		setPanelHeight(panelHeight === 48 ? '80vh' : 48);
		setOverflow(overflow === 'hidden' ? 'scroll' : 'hidden');
	}

	useEffect(() => {
		user.logArray = [];
	}, []);

	return (
		<div
			style={{
				position: 'absolute',
				right: 0,
				top: 0,
				display: 'flex',
				alignItems: 'flex-start',
				justifyContent: 'flex-end',
				width: '50%',
				height: panelHeight,
				background: 'black',
				zIndex: 1000,
				transition: '0.5s',
				overflowY: overflow,
			}}
		>
			<div style={{ color: '#ddd', flexGrow: 1, paddingTop: 15, textAlign: 'left', paddingLeft: 12 }}>
				{user.logArray.map((logline, index) => {
					return (
						<Typography
							component="p"
							variant="body2"
							id="last-log"
							style={{ display: 'block', color: logline.color }}
							key={index}
						>
							{logline.text}
						</Typography>
					);
				})}
			</div>
			<IconButton
				aria-label="delete"
				style={{ color: 'white' }}
				onClick={() => {
					expand();
				}}
			>
				<MenuIcon />
			</IconButton>
		</div>
	);
};

export default view(Logger);

import React, { useEffect } from "react";
import Typography from "@material-ui/core/Typography";

import { view } from "@risingstack/react-easy-state";
import { user } from "./../store";

const Logger = (props) => {
	useEffect(() => {
		user.logArray = [];
	}, []);

	return (
		<div
			style={{
				position: "absolute",
				right: 5,
				top: 3,
				display: "flex",
				alignItems: "flex-start",
				justifyContent: "flex-end",
				width: "100%",
				height: "calc(100vh - 60px)",
				background: "rgba(0,0,0,0.6)",
				zIndex: 1000,
				transition: "0.5s",
				borderRadius: 10,
				overflowY: "scroll",
			}}
			className="logger"
			id="logger">
			<div
				style={{
					color: "#ddd",
					flexGrow: 1,
					paddingTop: 15,
					textAlign: "left",
					paddingLeft: 12,
				}}>
				{user.logArray.map((logline, index) => {
					return (
						<Typography
							component="p"
							variant="body2"
							id="last-log"
							style={{ display: "block", color: logline.color }}
							key={index}>
							{logline.text}
						</Typography>
					);
				})}
			</div>
		</div>
	);
};

export default view(Logger);

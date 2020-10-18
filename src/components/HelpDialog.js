import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const AlertDialog = (props) => {
	return (
		<div>
			<Dialog
				open={props.open}
				onClose={props.onClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description">
				<DialogTitle id="alert-dialog-title">
					{"So it's not working eh?"}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						I try my best, but there's always going to be issues.
						I'll try to squash them when I can. If you run into an
						issue (especially if I just published an update!), first
						click the "Reset Program" button, then hard-reset your
						page by hitting Shift + F5. This will clear out old bad
						stuff and get you super up to date. If it STILL doesn't
						work, contact Brandon (cathcart.brandon@gmail.com).
					</DialogContentText>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default AlertDialog;

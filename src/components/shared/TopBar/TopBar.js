import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

import Tooltip from '@material-ui/core/Tooltip';
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

import MenuIcon from '@material-ui/icons/Menu';
import SettingsIcon from '@material-ui/icons/PowerSettingsNew';

import Styles from "./TopBar.styles";

@withStyles(Styles)
@withRouter
@inject("store")
@observer
export default class TopBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
            dialogOpen: false,
		};
	}

    renderDialog() {
	    const { dialogOpen } = this.state;

        return (
            <Dialog
                open={dialogOpen === true}
                onClose={() => this.setState({dialogOpen: false})}
                maxWidth={false}
            >
                <DialogTitle>Hi!</DialogTitle>
                <DialogContent>
                    <Typography variant="subheading">
                        This is an example dialog :)
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => this.setState({dialogOpen: false})} autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }

	render() {
	    const { classes, hidden, onMenuHandleClick } = this.props;

        return (
			<div className={classes.topBar} hidden={hidden}>
                <AppBar position="static">
                    <Toolbar className={classes.innerToolbar}>
                        <IconButton onClick={() => onMenuHandleClick()} color="inherit">
                            <MenuIcon color="inherit" />
                        </IconButton>
                        <Typography className={classes.appTitle} variant="title" color="inherit">
                            Recipe Puppy
                        </Typography>
                        <div className={classes.rightControls}>
                            <Tooltip title="Click me">
                                <IconButton
                                    onClick={() => this.setState({dialogOpen: true})}
                                    color="inherit"
                                >
                                    <SettingsIcon/>
                                </IconButton>
                            </Tooltip>
                        </div>
                    </Toolbar>
                </AppBar>
                {this.renderDialog()}
			</div>
		);
	}
}

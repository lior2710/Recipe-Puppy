import React, { Component } from "react";
import {Route, withRouter} from "react-router-dom";
import { inject, observer } from "mobx-react";
import { withStyles } from "@material-ui/core/styles";

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import FingerIcon from '@material-ui/icons/Fingerprint';

import TopBar from "./shared/TopBar/TopBar";

import NotFoundPage from "./pages/Errors/NotFound";
import SearchPage from './pages/Search/Search';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#757ce8',
            main: '#3f50b5',
            dark: '#002884',
            contrastText: '#fff',
        },
        secondary: {
            light: '#ff7961',
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#000',
        },
    },
});

import Styles from "./App.styles";
import '../styles/main.scss';

@withStyles(Styles)
@withRouter
@inject("store")
@observer
export default class App extends Component {
	constructor(props) {
        super(props);

        window.App.TopMessage = {};
        window.App.TopMessage.show = (msg, opt)    => this.showTopMessage(msg, opt);
        window.App.TopMessage.hide = (cbk) 		=> this.hideTopMessage(cbk);

        this.state = {
            infoBarMessage: '',
            infoBarMessageAction: undefined,
            infoBarMessageDuration: undefined,
            leftMenuOpen: false
		};
	}

    showTopMessage(infoBarMessage, options) {
		options = options || {};

		if (!infoBarMessage) return;

		if (!options.update) {
            window.App.TopMessage.hide();
        }

		if (options.action) {
            this.setState({infoBarMessageAction: options.action});
		}

		if (options.duration) {
            this.setState({infoBarMessageDuration: options.duration});
		}

		if (!options.delay) {
			options.delay = 100
		}

		setTimeout(() =>
			this.setState({infoBarMessage}), options.delay);
	}

    hideTopMessage(callback) {
		this.setState({
			infoBarMessage: '',
			infoBarMessageAction: undefined,
			infoBarMessageDuration: undefined
		}, callback);
	}

	renderRoutes() {
        const { classes } = this.props;

        return (
            <div className={classes.appContent}>
                <Route exact path="/" component={SearchPage}/>
                <Route exact path="/not_found" component={NotFoundPage}/>
            </div>
        );
	}

	render() {
	    const { infoBarMessageAction, infoBarMessageDuration, leftMenuOpen } = this.state;
        const { classes } = this.props;

		let infoBarMessage = this.state.infoBarMessage;

		return (
            <MuiThemeProvider theme={theme}>
				<div className={classes.app}>
					{/*<DevTools/>*/}

					<TopBar onMenuHandleClick={() => this.setState({leftMenuOpen: !leftMenuOpen})} />

					<div className={
					        ClassNames(
					            classes.appLayout,
                                {[classes.leftMenuOpen]: leftMenuOpen}
                            )}
                    >
						<Paper
							className={
								ClassNames(
                                    classes.leftDrawerMenu,
									{[classes.leftDrawerMenuOpen]: leftMenuOpen}
								)}
						>
                            <MenuItem>
                                <ListItemIcon>
                                    <FingerIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Menu Item" />
                            </MenuItem>
						</Paper>
						{this.renderRoutes()}
					</div>
					<Snackbar
                        anchorOrigin={{vertical: 'top', horizontal: 'center'}}
						open={!!infoBarMessage}
						message={infoBarMessage}
						autoHideDuration={infoBarMessageDuration || 4000}
						// onClose={() => {
						// 	appState.set({infoBarMessage: ''});
						// 	this.setState({infoBarMessage: '', infoBarMessageAction: undefined, infoBarMessageDuration: undefined});
						// }}
                        action={infoBarMessageAction &&
                            <Button
                                color="secondary"
                                onClick={(e) => infoBarMessageAction.onClick(e)}
                            >
                                {infoBarMessageAction.text}
                            </Button>
                        }
					/>
				</div>
			</MuiThemeProvider>
		);
	}
}

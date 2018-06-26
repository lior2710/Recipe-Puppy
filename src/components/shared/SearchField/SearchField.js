import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

import Tooltip from '@material-ui/core/Tooltip';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

import SearchIcon from '@material-ui/icons/Search';

import Styles from "./SearchField.styles";

@withStyles(Styles)
@withRouter
@inject("store")
@observer
export default class SearchField extends Component {
	constructor(props) {
		super(props);
		this.state = {
            error: undefined,
            term: undefined,
            waitingForSearch: false
		};
	}

    onKeyStroke(e) {
        clearTimeout(this.to);

        this.setState({error: undefined, waitingForSearch: true});

        let code = e.keyCode || e.which;

        if (code === 13) { this.search(); return }

        this.to = setTimeout(() => this.search(), 2000);
    }

    validateTerm(term) {
	    let invalidChars = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '=', '+']; // for example, can be regex as well

	    if (invalidChars.any(ch => term.includes(ch))) {
            return 'Search term contains invalid characters';
        }else if (term.length <= 3) {
            return 'Search term is to short';
        }

        return false;
    }

    search() {
        clearTimeout(this.to);

        const { term } = this.state;
        const { onSearch } = this.props;

        if (!term) return;

        let error = this.validateTerm(term);

        this.setState({waitingForSearch: false});

        if (Boolean(error)) {
            this.setState({error});
            return;
        }

        (onSearch || (() => {}))(term);
    }

	render() {
	    const { classes, searching } = this.props;
	    const { error, term, waitingForSearch } = this.state;

        return (
            <FormControl
                error={Boolean(error)}
                className={
                    ClassNames(
                        classes.formControl,
                        classes.searchField,
                        classes.halfWidth
                    )}
            >
                <InputLabel>
                    Enter your search term...
                </InputLabel>
                <Input
                    value={term}
                    onKeyUp={(e)=> this.onKeyStroke(e)}
                    onChange={(e) => this.setState({term: e.target.value})}
                />
                <FormHelperText>
                    {error}
                </FormHelperText>
                <div className={classes.searchButtonContainer}>
                    <Tooltip title="Click to start search">
                        <Button
                            variant="fab"
                            color="primary"
                            className={classes.searchButton}
                            onClick={() => this.search()}
                        >
                            <SearchIcon/>
                        </Button>
                    </Tooltip>
                    {(searching || waitingForSearch)
                        && <CircularProgress size={68} className={classes.searchButtonProgress} />}
                </div>
            </FormControl>
        );
	}
}

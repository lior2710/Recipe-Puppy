import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';


import SearchField from '../../shared/SearchField/SearchField';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";

import Styles from './Search.styles';

@withStyles(Styles)
@withRouter
@inject("store")
@observer
export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searching: false,
            searchMade: false
        };
    }

    onSearch(term) {
        const { store } = this.props;
        const { recipe } = store;

        this.setState({searching: true});

        App.TopMessage.show('Searching, Please wait...');

        recipe.fetchRecipes(term).then(() => {
            this.setState({searching: false, searchMade: true});
            setTimeout(() => App.TopMessage.hide(), 1000);
        });
    }

	render() {
        const { searching, searchMade } = this.state;
        const { classes, store } = this.props;
        const { recipe } = store;

        return (
			<Card className={classes.search}>
                <SearchField
                    onSearch={(term) => this.onSearch(term)}
                    searching={searching}
                />
                <div className={classes.results}>
                    {recipe.recipes.map(re =>
                        <Card className={classes.card} key={re.href}>
                            <CardMedia
                                className={classes.media}
                                image={re.thumbnail}
                            >
                            </CardMedia>
                            <CardContent>
                                <Typography gutterBottom variant="headline" component="h2">
                                    {re.title}
                                </Typography>
                                <Typography component="p">
                                    {re.ingredients}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button
                                    size="small"
                                    color="primary"
                                    onClick={() => window.open(re.href, '_blank')}
                                >
                                    Show
                                </Button>
                            </CardActions>
                        </Card>
                    )}
                    {(!recipe.recipes.length && searchMade) &&
                        <Typography variant="title">
                            No search results found for your search term...
                        </Typography>
                    }
                </div>
            </Card>
		);
	}
}

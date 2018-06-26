import GlobalStyles from '../../Global.styles';

export default function styles(theme) {
    return Object.assign({}, GlobalStyles(theme), {
        searchField: {
            position: 'relative',
        },
        searchButtonContainer: {
            position: 'absolute',
            top: '0',
            right: '0',
        },
        searchButtonProgress: {
            position: 'absolute',
            top: '0',
            left: '0',
            color: 'darkgray',
        },
        searchButton: {
            zIndex: 1,
            position: 'absolute',
            top: '6px',
            left: '6px',
        }
    });
};

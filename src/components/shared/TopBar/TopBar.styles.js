import GlobalStyles from '../../Global.styles';

export default function styles(theme) {
    return Object.assign({}, GlobalStyles(theme), {
        topBar: {
            position: "relative",
            zIndex: '2'
        },
        innerToolbar: {
            paddingLeft: '4px'
        },
        appTitle: {
            marginLeft: '8px'
        },
        rightControls: {
            position: 'absolute',
            right: '8px'
        },
    });
};

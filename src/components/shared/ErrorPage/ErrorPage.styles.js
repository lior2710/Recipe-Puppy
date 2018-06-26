import GlobalStyles from '../../Global.styles';

export default function styles(theme) {
    return Object.assign({}, GlobalStyles(theme), {
        errorPage: {
            textAlign: 'center',
            color: 'gray'
        },
        errorPageIcon: {
            width: '400px',
            height: 'auto',
            color: 'gray'
        }
    });
};

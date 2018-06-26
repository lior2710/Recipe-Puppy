import GlobalStyles from '../../Global.styles';

export default function styles(theme) {
    return Object.assign({}, GlobalStyles(theme), {
        search: {
            height: 'calc(100% - 100px)',
            padding: '50px'
        },
        results: {
            height: 'calc(100% - 100px)',
            display: 'block',
            overflowY: 'auto',
        },
        card: {
            width: '300px',
            display: 'inline-block',
            verticalAlign: 'top',
            margin: '20px'
        },
        media: {
            width: '300px',
            height: '200px'
        }
    });
};

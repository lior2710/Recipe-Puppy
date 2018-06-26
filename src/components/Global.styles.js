export default function styles(theme) {
    return {
        formControl: {
            marginRight: theme.spacing.unit,
            marginBottom: theme.spacing.unit * 3,
            width: 200,
        },
        unselectable: {
            '-webkit-user-select': 'none'   /* Safari & Chrome  */,
            '-moz-user-select': 'none'      /* Firefox          */,
            '-ms-user-select': 'none'       /* IE10+/Edge       */,
            userSelect: 'none'              /* Standard         */
        },
        blink: {
            animation: 'blinker 1s linear infinite',
        },
        dark: {
            color: "white",
            borderColor: "white",
            '& svg': {

            }
        },
        leftIcon: {
            marginRight: theme.spacing.unit,
        },
        rightIcon: {
            marginLeft: theme.spacing.unit,
        },
        progressContainer: {
            width: "100% !important",
            textAlign: "center",
            marginTop: "16px"
        },
        primary: {
            '& *': {
                color: theme.palette.primary
            }
        },
        secondary: {
            '& *': {
                color: theme.palette.secondary
            }
        },
        bold: {
            fontWeight: 900,
            '& *': {
                fontWeight: 900
            }
        },
        inline: {
            display: 'inline-block'
        },
        radioLabel: {
            // marginTop: 10,
            marginBottom: 10
        },
        fullWidth: {
            width: '100%'
        },
        halfWidth: {
            width: '50%'
        }
    };
};

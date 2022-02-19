import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from '@mui/styles';
import { Link, Toolbar, IconButton, Typography } from '@mui/material';

const useStyles = makeStyles({
    toolbar: {
        borderBottom: '1px solid black',
    },
    toolbarTitle: {
        flex: 1,
    },
    toolbarLink: {
        padding: 1,
        flexShrink: 0,
    },
    toolbarSecondary: {
        justifyContent: "space-between",
        overflowX: "auto",
    },
});

export default function Header(props) {
    const classes = useStyles();
    const { sections, title } = props;

    return (
        <React.Fragment>
            <Toolbar className={classes.toolbar}>
                {/* <Button size="small">Subscribe</Button> */}
                <Typography
                    variant="h5"
                    color="inherit"
                    align="center"
                    noWrap
                    className={classes.toolbarTitle}
                >
                    <Link
                        color="inherit"
                        noWrap
                        href="/"
                        className={classes.toolbarLink}
                    >
                        {title}
                    </Link>
                </Typography>
                <IconButton></IconButton>
            </Toolbar>
            <Toolbar
                component="nav"
                variant="dense"
                className={classes.toolbarSecondary}
            >
                {sections.map(section => (
                    <Link
                        color="inherit"
                        noWrap
                        key={section.title}
                        variant="body2"
                        href={section.url}
                        className={classes.toolbarLink}
                    >
                        {section.title}
                    </Link>
                ))}
            </Toolbar>
        </React.Fragment>
    );
}

Header.propTypes = {
    sections: PropTypes.array,
    title: PropTypes.string,
};

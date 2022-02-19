import React from "react";
import { Link } from "gatsby";

import { makeStyles } from '@mui/styles';
import { Grid, Paper, Typography } from '@mui/material';
import { GitHub, Facebook, Twitter } from "@mui/icons-material";

const useStyles = makeStyles({
    sidebarAboutBox: {
        padding: 2,
        backgroundColor: 'gray',
    },
    sidebarSection: {
        marginTop: 3,
    },
});

const social = [
    {
      name: "GitHub",
      icon: GitHub,
      url: "https://github.com/rbrynteson",
    },
    {
      name: "Twitter",
      icon: Twitter,
      url: "https://twitter.com/rbrynteson",
    },
    {
      name: "Facebook",
      icon: Facebook,
      url: "https://www.facebook.com/DJBrynteson/",
    },
  ];

export default function Sidebar() {
    const classes = useStyles();

    return (
        <Grid item xs={12} md={4}>
            <Paper elevation={0} className={classes.sidebarAboutBox}>
                <Typography variant="h6" gutterBottom>
                    About
                </Typography>
                <Typography></Typography>
            </Paper>
            <Typography
                variant="h6"
                gutterBottom
                className={classes.sidebarSection}
            >
                Tags
            </Typography>
            
            <Typography
                variant="h6"
                gutterBottom
                className={classes.sidebarSection}
            >
                Social
            </Typography>
            {social.map(network => (
                <Link variant="body1" href={network.url} key={network.name}>
                    <Grid
                        container
                        direction="row"
                        spacing={1}
                        alignItems="center"
                    >
                        <Grid item>
                            <network.icon />
                        </Grid>
                        <Grid item>{network.name}</Grid>
                    </Grid>
                </Link>
            ))}
        </Grid>
    );
}

import React from "react";
import kebabCase from "lodash/kebabCase";
import { useStaticQuery, graphql } from "gatsby";
import { makeStyles } from "@mui/styles";
import { Grid, Paper, Typography, Link, Divider } from "@mui/material";
import { GitHub, Facebook, Twitter } from "@mui/icons-material";

const useStyles = makeStyles({
  sidebarAboutBox: {
    padding: "15px",
    backgroundColor: "#eeeeee",
  },
  sidebarSection: {
    marginTop: 3,
  },
})

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
]

export default function Sidebar() {
  const classes = useStyles()

  const data = useStaticQuery(
    graphql`
      query {
        allWpPost(limit: 1000) {
          group(field: categories___nodes___name) {
            fieldValue
            totalCount
          }
        }
        site {
          siteMetadata {
            description
          }
        }
      }
    `
  )

  return (
    <Grid item xs={12} md={4}>
      <Paper elevation={0} className={classes.sidebarAboutBox}>
        <Typography variant="h6" gutterBottom>
          About
        </Typography>
        <Typography>
          These are just some random thoughts and ideas from a Microsoft MVP. We
          might cover everything from Development, to Teams, to Skype and might
          even through in a random bit of Azure and AWS
        </Typography>
      </Paper>
      <Typography variant="h6" gutterBottom className={classes.sidebarSection}>
        Tags
      </Typography>
      {data.allWpPost.group.map(tag => (
        <div key={tag.fieldValue}>
          <Link href={`/tags/${kebabCase(tag.fieldValue)}/`}>
            {tag.fieldValue} ({tag.totalCount})
          </Link>
          <Divider></Divider>
        </div>
      ))}
      <Typography variant="h6" gutterBottom className={classes.sidebarSection}>
        Social
      </Typography>
      {social.map(network => (
        <Link href={network.url} key={network.name}>
          <Grid container direction="row" spacing={1} alignItems="center">
            <Grid item>
              <network.icon />
            </Grid>
            <Grid item>{network.name}</Grid>
          </Grid>
        </Link>
      ))}
    </Grid>
  )
}

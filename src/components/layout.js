import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { makeStyles } from "@mui/styles";
import { CssBaseline, Container, Grid } from "@mui/material";


import Header from "../components/header.js"
import Sidebar from "../components/sidebar"

const Layout = ({ isHomePage, children }) => {
  const {
    wp: {
      generalSettings: { title },
    },
  } = useStaticQuery(graphql`
    query LayoutQuery {
      wp {
        generalSettings {
          title
          description
        }
      }
    }
  `)

  const useStyles = makeStyles({
    mainGrid: {
      marginTop: 3,
    },
  })

  const sections = [
    { title: "Development", url: "/tags/development/" },
    { title: "Microsoft Teams", url: "/tags/microsoft-teams/" },
    { title: "Skype for Business", url: "/tags/skype-for-business/" },
    { title: "Validator", url: "/tags/validator/" },
    { title: "Bookmarks", url: "/bookmarks" },
    { title: "Projects", url: "#" },
    { title: "About", url: "/about" },
  ]

  const classes = useStyles()
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title={title} sections={sections} />
        <Grid container spacing={5} className={classes.mainGrid}>
          {children}
          <Sidebar />
        </Grid>
      </Container>
    </React.Fragment>
  )
}

export default Layout

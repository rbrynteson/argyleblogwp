import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { styled } from "@mui/material/styles";
import { CssBaseline, Container, Grid } from "@mui/material";

import Header from "../components/header.js";
import Sidebar from "../components/sidebar";
import Footer from "../components/footer.js";

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
    `);

    const StyledGrid = styled(Grid)(
        ({ theme }) => `
          margin-top: 3px;
        `
    );

    const sections = [
        { title: "Development", url: "/tags/development/" },
        { title: "Microsoft Teams", url: "/tags/microsoft-teams/" },
        { title: "Skype for Business", url: "/tags/skype-for-business/" },
        { title: "Validator", url: "/tags/validator/" },
        { title: "Bookmarks", url: "/2020/01/01/bookmarks/" },
        { title: "Users Group", url: "/tags/users-group/" },
        { title: "About", url: "/2020/01/01/about-the-argyle-mvp/" },
    ];

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg">
                <Header title={title} sections={sections} />
                <StyledGrid container spacing={5}>
                    {children}
                    <Sidebar />
                </StyledGrid>
                <Footer description="Built using Gatsby and Material-UI" />
            </Container>
        </React.Fragment>
    );
};

export default Layout;

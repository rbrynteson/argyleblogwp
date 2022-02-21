import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { styled } from "@mui/material/styles";
import { Typography, Grid, Link, Paper } from "@mui/material";

const Featured = () => {
    const featuredPosts = useStaticQuery(graphql`
        query {
            allWpPost(
                sort: { order: DESC, fields: date }
                limit: 1
                filter: { isSticky: { eq: true } }
            ) {
                edges {
                    node {
                        date(formatString: "MMMM DD, YYYY")
                        id
                        uri
                        title
                        slug
                        excerpt
                        featuredImage {
                            node {
                                mediaItemUrl
                            }
                        }
                    }
                }
            }
        }
    `);
    console.log(featuredPosts.allWpPost.edges[0].node);
    const featuredPost = featuredPosts.allWpPost.edges[0].node;
    

    const StyledPaper = styled(Paper)(
        ({ theme }) => `
            position: relative;
            backgroundColor: #eeeeee;
            color: #000000;
            marginBottom: 4;
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
        `
    );

    const StyledOverlay = styled("div")(
        ({ theme }) => `
            position: absolute;
            top: 0;
            bottom: 0;
            right: 0;
            left: 0;
            background-color: rgba(0,0,0,.3);
        `
    );

    const StyledFeature = styled("div")(
        ({ theme }) => `
            position: relative;
            padding: 3,
            padding: 6,
            padding-right: 0,
        `
    );

    return (
        <StyledPaper
            style={{
                backgroundImage: `url(${featuredPost.featuredImage.node.mediaItemUrl})`,
            }}
        >
            {/* Increase the priority of the hero background image */}
            {
                <img
                    style={{ display: "none" }}
                    src={featuredPost.featuredImage.node.mediaItemUrl}
                    alt={featuredPost.title}
                />
            }
            <StyledOverlay />
            <Grid container>
                <Grid item md={6}>
                    <StyledFeature>
                        <Typography
                            component="h1"
                            variant="h3"
                            color="inherit"
                            gutterBottom
                        >
                            {featuredPost.title}
                        </Typography>
                        <Typography variant="h5" color="inherit" paragraph>
                            {featuredPost.excerpt}
                        </Typography>
                        <Link
                            variant="subtitle1"
                            href={featuredPost.uri}
                        >
                            Continue Reading...
                        </Link>
                    </StyledFeature>
                </Grid>
            </Grid>
            
        </StyledPaper>
    );
};

export default Featured;

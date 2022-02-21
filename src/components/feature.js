import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { styled } from "@mui/material/styles";
import { Typography, Grid, Link, Paper } from "@mui/material";

const Featured = () => {
    function stripHtml(html){
        // Create a new div element
        var temporalDivElement = document.createElement("div");
        // Set the HTML content with the providen
        temporalDivElement.innerHTML = html;
        // Retrieve the text property of the element (cross-browser support)
        return temporalDivElement.textContent || temporalDivElement.innerText || "";
    }

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
    const featuredPost = featuredPosts.allWpPost.edges[0].node;
    const excerpt = stripHtml(featuredPost.excerpt);
    
    const StyledPaper = styled(Paper)(
        ({ theme }) => `
            position: relative;
            backgroundColor: #eeeeee;
            color: #ffffff;
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
            padding-left: 20px;
            padding-top: 20px;
            padding-bottom: 20px;
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
                            {excerpt}...
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

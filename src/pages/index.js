import React from "react";
import { graphql } from "gatsby";
import { makeStyles } from "@mui/styles";
import Layout from "../components/layout";
import {
    Hidden,
    Card,
    CardMedia,
    CardContent,
    Typography,
    Grid,
} from "@mui/material";

const useStyles = makeStyles({
    card: {
        display: "flex",
    },
    cardDetails: {
        flex: 1,
    },
    divPadding: {
        marginBottom: 10,
    },
    noLink: {
        textDecoration: "none",
        color: "inherit",
    },
    maxImageSize: {
        maxHeight: 115,
        maxWidth: 225,
    },
});

export default function Index({ data }) {
    const classes = useStyles();

    return (
        <Layout>
            <Grid item xs={12} md={8}>
                <Typography variant="h4" color="inherit" gutterBottom={true}>
                    Recent Stories
                </Typography>
                {data.TopPosts.edges.map(({ node }) => (
                    <div className={classes.divPadding} key={node.id}>
                        <a className={classes.noLink} href={node.uri}>
                            <Card className={classes.card}>
                                <div className={classes.cardDetails}>
                                    <CardContent>
                                        <Typography variant="h5">
                                            {node.title}
                                        </Typography>
                                        <Typography
                                            variant="subtitle1"
                                            color="textSecondary"
                                        >
                                            By Richard Brynteson {node.date}
                                        </Typography>
                                        <Typography variant="caption" paragraph>
                                            {node.excerpt}
                                        </Typography>
                                    </CardContent>
                                </div>
                                <Hidden xsDown>
                                    {node.featuredImage != null ? (
                                        <CardMedia>
                                            <img
                                                src={
                                                    node.featuredImage.node
                                                        .mediaItemUrl
                                                }
                                                className={classes.maxImageSize}
                                                alt=""
                                            />
                                        </CardMedia>
                                    ) : null}
                                </Hidden>
                            </Card>
                        </a>
                    </div>
                ))}
            </Grid>
        </Layout>
    );
}

export const query = graphql`
    query {
        TopPosts: allWpPost(sort: { order: DESC, fields: date }, limit: 5) {
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
        Featured: allWpPost(
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
`;

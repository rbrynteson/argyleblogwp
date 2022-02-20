import React from "react";
import { graphql } from "gatsby";
import { styled } from "@mui/material/styles";
import Layout from "../components/layout";
import {
    Hidden,
    Card,
    CardMedia,
    CardContent,
    Typography,
    Grid,
} from "@mui/material";

const StyledCard = styled(Card)(
    ({ theme }) => `
        display: flex;
    `
);

const StyledCardDetails = styled('div')(
    ({ theme }) => `
        flex: 1;
    `
);

const StyledCardPadding = styled('div')(
    ({ theme }) => `
        margin-bottom: 10px;
    `
);

const StyledNoLink = styled('a')(
    ({ theme }) => `
        text-decoration: none;
        color: inherit;
    `
);

const StyledImage= styled('img')(
    ({ theme }) => `
        max-height: 115px;
        max-width: 225px;
    `
);

export default function Index({ data }) {
    return (
        <Layout>
            <Grid item xs={12} md={8}>
                <Typography variant="h4" color="inherit" gutterBottom={true}>
                    Recent Stories
                </Typography>
                {data.TopPosts.edges.map(({ node }) => (
                    <StyledCardPadding key={node.id}>
                        <StyledNoLink href={node.uri}>
                            <StyledCard>
                                <StyledCardDetails>
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
                                </StyledCardDetails>
                                <Hidden xsDown>
                                    {node.featuredImage != null ? (
                                        <CardMedia>
                                            <StyledImage
                                                src={
                                                    node.featuredImage.node
                                                        .mediaItemUrl
                                                }
                                                alt=""
                                            />
                                        </CardMedia>
                                    ) : null}
                                </Hidden>
                            </StyledCard>
                        </StyledNoLink>
                    </StyledCardPadding>
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

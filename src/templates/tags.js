import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";

import { Link, Typography, Grid } from "@mui/material";

const Tags = ({ pageContext, data }) => {
    const { tag } = pageContext;
    const { edges, totalCount } = data.allWpPost;
    const tagHeader = `${totalCount} post${
        totalCount === 1 ? "" : "s"
    } tagged with "${tag}"`;
    return (
        <Layout>
            <Grid item xs={12} md={8}>
                <div>
                    <Typography variant="h4" color="inherit" gutterBottom={true}>
                        {tagHeader}
                    </Typography>
                    <ul>
                        {edges.map(item => {
                            const uri = item.node.uri;
                            const title = item.node.title;
                            return (
                                <li key={uri}>
                                    <Link href={uri}>{title}</Link>
                                </li>
                            );
                        })}
                    </ul>
                    <Link to="/tags">All tags</Link>
                </div>
            </Grid>
        </Layout>
    );
};

export default Tags;
export const pageQuery = graphql`
    query($tag: String) {
        allWpPost(
            limit: 2000
            sort: { fields: [date], order: DESC }
            filter: {
                categories: { nodes: { elemMatch: { name: { in: [$tag] } } } }
            }
        ) {
            totalCount
            edges {
                node {
                    title
                    uri
                }
            }
        }
    }
`;

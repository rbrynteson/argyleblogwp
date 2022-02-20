import React from "react";
import kebabCase from "lodash/kebabCase";
import { Helmet } from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../components/layout";

import { Link, Grid, Typography } from "@mui/material";

const TagsPage = ({
    data: {
        allWpPost: { group },
        site: {
            siteMetadata: { title },
        },
    },
}) => (
    <Layout>
        <Grid item xs={12} md={8}>
            <div>
                <Helmet title="All Tags" />
                <div>
                    <Typography
                        variant="h4"
                        color="inherit"
                        gutterBottom={true}
                    >
                        All Tags
                    </Typography>
                    <ul>
                        {group.map(tag => (
                            <li key={tag.fieldValue}>
                                <Link
                                    href={`/tags/${kebabCase(tag.fieldValue)}/`}
                                >
                                    {tag.fieldValue} ({tag.totalCount})
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </Grid>
    </Layout>
);
export default TagsPage;

export const pageQuery = graphql`
    query {
        allWpPost(limit: 2000) {
            group(field: categories___nodes___name) {
                fieldValue
                totalCount
            }
        }
        site {
            siteMetadata {
                title
            }
        }
    }
`;

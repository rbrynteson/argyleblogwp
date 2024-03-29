import React from "react";
import { graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import { Grid, Link } from "@mui/material";
import parse from "html-react-parser";

import Comments from "../components/comments";
import Bio from "../components/bio";
import Layout from "../components/layout";
import Seo from "../components/seo";

const BlogPostTemplate = ({ data: { previous, next, post } }) => {
    const featuredImage = {
        data:
            post.featuredImage?.node?.localFile?.childImageSharp
                ?.gatsbyImageData,
        alt: post.featuredImage?.node?.alt || ``,
    };

    return (
        <Layout>
            <Seo
                title={post.title}
                description={post.excerpt.replace(/<[^>]+>/g, "")}
                author={post.author.node.name}
            />
            <Grid item xs={12} md={8}>
                <div className="post">
                    <article
                        className="blog-post"
                        itemScope
                        itemType="http://schema.org/Article"
                    >
                        <header>
                            <h1 itemProp="headline">{parse(post.title)}</h1>

                            <p>{post.date}</p>

                            {/* if we have a featured image for this post let's display it */}
                            {featuredImage?.data && (
                                <GatsbyImage
                                    image={featuredImage.data}
                                    alt={featuredImage.alt}
                                    style={{ marginBottom: 50 }}
                                />
                            )}
                        </header>

                        {!!post.content && (
                            <section itemProp="articleBody">
                                {parse(post.content)}
                            </section>
                        )}

                        <hr />

                        <Comments></Comments>

                        <footer>
                            <Bio />
                        </footer>
                    </article>
                </div>

                <nav className="blog-post-nav">
                    <ul
                        style={{
                            display: `flex`,
                            flexWrap: `wrap`,
                            justifyContent: `space-between`,
                            listStyle: `none`,
                            padding: 0,
                        }}
                    >
                        <li>
                            {previous && (
                                <Link href={previous.uri} rel="prev">
                                    ← {parse(previous.title)}
                                </Link>
                            )}
                        </li>

                        <li>
                            {next && (
                                <Link href={next.uri} rel="next">
                                    {parse(next.title)} →
                                </Link>
                            )}
                        </li>
                    </ul>
                </nav>
            </Grid>
        </Layout>
    );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
    query BlogPostById(
        $id: String!
        $previousPostId: String
        $nextPostId: String
    ) {
        post: wpPost(id: { eq: $id }) {
            id
            excerpt
            content
            title
            date(formatString: "MMMM DD, YYYY")
            featuredImage {
                node {
                    altText
                    localFile {
                        childImageSharp {
                            gatsbyImageData(
                                quality: 100
                                placeholder: TRACED_SVG
                                layout: FULL_WIDTH
                            )
                        }
                    }
                }
            }
            author {
                node {
                    name
                }
            }
        }
        previous: wpPost(id: { eq: $previousPostId }) {
            uri
            title
        }
        next: wpPost(id: { eq: $nextPostId }) {
            uri
            title
        }
    }
`;

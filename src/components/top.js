import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { styled } from "@mui/material/styles";
import {
    Hidden,
    Card,
    CardMedia,
    CardContent,
    Typography,
} from "@mui/material";

const Top = () => {
    function stripHtml(html){
        // Create a new div element
        var temporalDivElement = document.createElement("div");
        // Set the HTML content with the providen
        temporalDivElement.innerHTML = html;
        // Retrieve the text property of the element (cross-browser support)
        return temporalDivElement.textContent || temporalDivElement.innerText || "";
    }

    const topPosts = useStaticQuery(graphql`
        query {
            allWpPost(sort: { order: DESC, fields: date }, limit: 5) {
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

    const StyledCard = styled(Card)(
        ({ theme }) => `
            display: flex;
        `
    );

    const StyledCardDetails = styled("div")(
        ({ theme }) => `
            flex: 1;
        `
    );

    const StyledCardPadding = styled("div")(
        ({ theme }) => `
            margin-bottom: 10px;
        `
    );

    const StyledNoLink = styled("a")(
        ({ theme }) => `
            text-decoration: none;
            color: inherit;
        `
    );

    const StyledImage = styled("img")(
        ({ theme }) => `
            max-height: 115px;
            max-width: 225px;
        `
    );

    return (
        <div>
            { topPosts.allWpPost.edges.map(({ node }) => (
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
                                        {stripHtml(node.excerpt)}
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
            )) }
        </div>
    );
};

export default Top;

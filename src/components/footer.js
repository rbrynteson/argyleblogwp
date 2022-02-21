import React from "react";

import { styled } from "@mui/material/styles";
import {
    Link,
    Container,
    Typography,
} from "@mui/material";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="https://theargylemvp.com/">
                TheArgyleMVP
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const StyledFooter = styled("footer")(
    ({ theme }) => `
        margin-top: 8px,
        padding: 6px,
    `
);

export default function Footer(props) {
    const { description } = props;

    return (
        <StyledFooter>
            <Container maxWidth="lg">
                <Typography
                    variant="subtitle1"
                    align="center"
                    color="textSecondary"
                    component="p"
                >
                    {description}
                </Typography>
                <Copyright />
            </Container>
        </StyledFooter>
    );
}

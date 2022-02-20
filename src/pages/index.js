import React from "react";
import Layout from "../components/layout";
import Top from "../components/top";
import {
    Typography,
    Grid,
} from "@mui/material";


export default function Index() {
    return (
        <Layout>
            <Grid item xs={12} md={8}>
                <Typography variant="h4" color="inherit" gutterBottom={true}>
                    Recent Stories
                </Typography>
                <Top />
            </Grid>
        </Layout>
    );
}

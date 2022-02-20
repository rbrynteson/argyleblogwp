import React from "react";
import PropTypes from "prop-types";

import { styled } from '@mui/material/styles';
import { Link, Toolbar, IconButton, Typography } from "@mui/material";

const StyledToolbar = styled(Toolbar)(
    ({ theme }) => `
    border-bottom: 1px solid black;
  `
);

const StyledSecondToolbar = styled(Toolbar)(
    ({ theme }) => `
    justify-content: space-between;
    overflow-x: auto;
  `
);

const StyledTypography = styled(Typography)(
    ({ theme }) => `
    flex: 1;
  `
);

const StyledLink = styled(Link)(
    ({ theme }) => `
    padding: 1;
    flex-shrink: 0;
  `
);

export default function Header(props) {
    const { sections, title } = props;

    return (
        <React.Fragment>
            <StyledToolbar>
                {/* <Button size="small">Subscribe</Button> */}
                <StyledTypography
                    variant="h5"
                    color="inherit"
                    align="center"
                    noWrap
                >
                    <StyledLink
                        color="inherit"
                        noWrap
                        href="/"
                    >
                        {title}
                    </StyledLink>
                </StyledTypography>
                <IconButton></IconButton>
            </StyledToolbar>
            <StyledSecondToolbar
                component="nav"
                variant="dense"
            >
                {sections.map(section => (
                    <StyledLink
                        color="inherit"
                        noWrap
                        key={section.title}
                        variant="body2"
                        href={section.url}
                    >
                        {section.title}
                    </StyledLink>
                ))}
            </StyledSecondToolbar>
        </React.Fragment>
    );
}

Header.propTypes = {
    sections: PropTypes.array,
    title: PropTypes.string,
};

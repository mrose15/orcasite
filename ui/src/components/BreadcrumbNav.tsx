import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Breadcrumbs as MuiBreadcrumbs, Link, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";

const StyledBreadcrumbs = styled(MuiBreadcrumbs)(({ theme }) => ({
  "& .MuiBreadcrumbs-ol": {
    padding: theme.spacing(1),
  },
  "& .MuiBreadcrumbs-separator": {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
}));

const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: "none",
  "&:hover": {
    textDecoration: "underline",
  },
}));

const CustomBreadcrumbs = ({ items }) => {
  return (
    <StyledBreadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return isLast ? (
          <Typography key={item.label} color="text.primary">
            {item.label}
          </Typography>
        ) : (
          <StyledLink key={item.label} href={item.href}>
            {item.label}
          </StyledLink>
        );
      })}
    </StyledBreadcrumbs>
  );
};

export default CustomBreadcrumbs;

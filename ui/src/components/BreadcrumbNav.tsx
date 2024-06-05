import Breadcrumbs, { BreadcrumbsProps } from "@mui/material";
import { styled } from "@mui/material";

const BreadcrumbNav = styled(Breadcrumbs)<BreadcrumbsProps>(({ theme }) => ({
  "aria-label": "breadcrumb",
}));

export default function StyledCustomization() {
  return <BreadcrumbNav />;
}

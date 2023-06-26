import NextLink from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { Box, Button, ListItem } from "@mui/material";
import { useState } from "react";

export const NavItem = (props) => {
  const { children, href, icon, title, ...others } = props;
  const [isActive, setIsActive] = useState(false);

  const router = useRouter();

  const active = href ? router.pathname.includes(href) : false;
  let includeCheck = children
    ?.map((data) => data.href)
    .includes(router.pathname);
  const [showChildren, setShowChildren] = useState(includeCheck);

  let childrenList = children?.map((child, index) => (
    <ListItem
      disableGutters
      sx={{
        display: "flex",
        mb: 0.5,
        py: 0,
        px: 2,
      }}
      {...others}
      key={child.title}
    >
      <NextLink href={child.href} passHref>
        <Button
          component="a"
          startIcon={child.icon}
          disableRipple
          sx={{
            backgroundColor:
              child.href === router.pathname && "rgba(255,255,255, 0.08)",
            borderRadius: 1,
            color:
              child.href === router.pathname ? "secondary.main" : "neutral.300",
            fontWeight: child.href === router.pathname && "fontWeightBold",
            justifyContent: "flex-start",
            px: 3,
            textAlign: "left",
            textTransform: "none",
            width: "100%",
            "& .MuiButton-startIcon": {
              color:
                child.href === router.pathname
                  ? "secondary.main"
                  : "neutral.400",
            },
            "&:hover": {
              backgroundColor: "rgba(255,255,255, 0.08)",
            },
          }}
        >
          <Box sx={{ flexGrow: 1, pl: 3 }}>- {child.title}</Box>
        </Button>
      </NextLink>
    </ListItem>
  ));
  return (
    <>
      <ListItem
        disableGutters
        sx={{
          display: "flex",
          mb: 0.5,
          py: 0,
          px: 2,
        }}
        {...others}
      >
        <NextLink href={isActive ? href : "#"} passHref>
          <Button
            component="a"
            startIcon={icon}
            disableRipple
            sx={{
              backgroundColor: active && "rgba(255,255,255, 0.08)",
              borderRadius: 1,
              color: active ? "secondary.main" : "neutral.300",
              fontWeight: active && "fontWeightBold",
              justifyContent: "flex-start",
              px: 3,
              textAlign: "left",
              textTransform: "none",
              width: "100%",
              "& .MuiButton-startIcon": {
                color: active ? "secondary.main" : "neutral.400",
              },
              "&:hover": {
                backgroundColor: "rgba(255,255,255, 0.08)",
              },
            }}
            onClick={() => {
              setShowChildren(!showChildren);
            }}
          >
            <Box sx={{ flexGrow: 1 }}>{title}</Box>
          </Button>
        </NextLink>
      </ListItem>
      {showChildren && childrenList}
    </>
  );
};

NavItem.propTypes = {
  href: PropTypes.string,
  icon: PropTypes.node,
  title: PropTypes.string,
};

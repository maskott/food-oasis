import React from "react";
import { Button as MuiButton } from "@material-ui/core";
import PropTypes from "prop-types";
import { ICON_DICT } from "./iconLookup";

const Base = ({ children, variant, color, type, ...props }) => {
  return (
    <MuiButton
      type={type || "button"}
      variant={variant || "contained"}
      color={color || "primary"}
      aria-label={type || "button"}
      {...props}
    >
      {children}
    </MuiButton>
  );
};

Base.propTypes = {
  children: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  color: PropTypes.string,
  variant: PropTypes.string,
  ariaLabel: PropTypes.string,
  type: PropTypes.string,
};

const Button = ({ children, icon, iconPosition, ...props }) => {
  if (icon !== undefined && iconPosition !== undefined) {
    let Icon = ICON_DICT[icon];

    if (iconPosition === "start") {
      return (
        <Base startIcon={<Icon />} {...props}>
          {...children}
        </Base>
      );
    }
    if (iconPosition === "end") {
      return (
        <Base endIcon={<Icon />} {...props}>
          {...children}
        </Base>
      );
    }
  }

  return <Base {...props}>{...children}</Base>;
};

Button.propTypes = {
  children: PropTypes.string.isRequired,
  kind: PropTypes.string,
  icon: PropTypes.oneOf([
    "add",
    "delete",
    "check",
    "close",
    "save",
    "edit",
    "cancel",
    "locationOn",
    "locationSearching",
    "menu",
    "search",
    "details",
    "remove",
  ]),
};

export default Button;

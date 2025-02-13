import React, { useState } from "react";
import useLocationHook from "hooks/useLocationHook";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../contexts/user-context";
import { makeStyles } from "@material-ui/core/styles";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { MENU_ITEMS } from "helpers/Constants";
import MenuItemLink from "./MenuItemLink";
import { logout } from "../Account/Logout";
import { IconButton } from '../../components/UI';

Menu.propTypes = {
  user: PropTypes.object,
  setUser: PropTypes.func,
  setToast: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  menuButton: {
    transform: "scale(1.4,1.2)",
    minWidth: "0",
    backgroundColor: "#FFF",
    "&:hover": {
      backgroundColor: "#FFF",
      opacity: 0.8,
    },
    [theme.breakpoints.down("xs")]: {
      transform: "scale(1.2, 1.2)",
    },
  },
  blueMenu: {
    fill: "#19334D",
  },
}));

export default function Menu(props) {
  const isHomePage = useLocationHook();
  const homePageStyles = {
    buttonColor: "#F1F1F1",
  };

  const defaultStyles = {
    headerColor: "#FFF",
  };
  const styles = isHomePage ? homePageStyles : defaultStyles;
  const classes = useStyles(styles);
  const { user, setUser, setToast } = props;
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();

  const toggleDrawer = (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setIsOpen(!isOpen);
  };

  const unAuthLinks = (
    <>
      <Divider />
      <MenuItemLink key="login" to="/login" text="Volunteer Login">
        Login
      </MenuItemLink>
    </>
  );

  const authedLinks = (
    <>
      <Divider />
      <MenuItemLink
        to="/"
        key="logout"
        text="Logout"
        onClick={() => logout(setUser, setToast, history)}
      >
        Logout
      </MenuItemLink>
    </>
  );

  const sideList = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={(e) => toggleDrawer(e)}
      onKeyDown={(e) => toggleDrawer(e)}
    >
      <List>
        {user && (
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <AccountCircleIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={user.firstName} />
          </ListItem>
        )}
        <Divider />
        <UserContext.Consumer>
          {(user) => (
            <>
              {user && (user.isAdmin || user.isCoordinator) && (
                <>
                  <MenuItemLink
                    key="organizationedit"
                    to="/organizationedit"
                    text="Add New Organization"
                  />
                  <MenuItemLink
                    key="organizationimport"
                    to="/organizationimport"
                    text="Import Organizations"
                  />
                  <MenuItemLink
                    key="verificationadmin"
                    to="/verificationadmin"
                    text="Verification Admin"
                  />
                </>
              )}
              <Divider />
              {user && user.isDataEntry && (
                <MenuItemLink
                  key="verificationdashboard"
                  to="/verificationdashboard"
                  text="My Dashboard"
                />
              )}
              <Divider />
              {user && (user.isSecurityAdmin || user.isGlobalAdmin) && (
                <MenuItemLink
                  key="securityadmindashboard"
                  to="/securityadmindashboard"
                  text="Security Admin Dashboard"
                />
              )}
              {user && user.isGlobalAdmin && (
                <>
                  <MenuItemLink
                    key="parentorganizations"
                    to="/parentorganizations"
                    text="Parent Organization Dashboard"
                  />
                  <MenuItemLink
                    key="suggestions"
                    to="/suggestions"
                    text="Suggestions Dashboard"
                  />
                </>
              )}
              <Divider />
            </>
          )}
        </UserContext.Consumer>

        {MENU_ITEMS.map((item, index) => {
          const { text, link } = item;
          return <MenuItemLink key={index} to={link} text={text} />;
        })}

        {user ? authedLinks : unAuthLinks}
      </List>
      {/* <LanguageChooser /> */}
    </div>
  );

  return (
    <div>
      <IconButton 
        icon='menu'
        onClick={toggleDrawer}
        classes={{
          root:classes.menuButton,
          label:classes.blueMenu
        }}
      />
      <Drawer anchor={"right"} open={isOpen} onClose={toggleDrawer}>
        {sideList()}
      </Drawer>
    </div>
  );
}

import React, { useState, useContext, useEffect } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  MenuItem,
  Menu
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { UserContext } from "../../UserContext";
import { Link } from 'react-router-dom';
import LanguageIcon from '@mui/icons-material/Language';
import { useTranslation } from "react-i18next";
import i18next from "i18next";

const DrawerComp = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const user = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const { i18n, t } = useTranslation(["drawer"]);
  const lng = localStorage.getItem("i18nextLng");

  useEffect(() => {
    if (lng && lng.length > 2) {
      i18next.changeLanguage("en");
    }
  }, []);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (e: any) => {
    i18n.changeLanguage(e.target.getAttribute("value"));
    handleClose();
  };

  return (
    <React.Fragment>
      <div style={{ display: "flex", marginLeft: "auto" }}>
        <IconButton
          sx={{ color: "white" }}
          onClick={handleClick}
        >
          <LanguageIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem value="en" onClick={handleLanguageChange}>English</MenuItem>
          <MenuItem value="hu" onClick={handleLanguageChange}>Magyar</MenuItem>
        </Menu>

        <Drawer
          anchor="left"
          open={openDrawer}
          onClose={() => setOpenDrawer(false)}
        >
          {user?.isLoggedIn === true ?
            <List>
              {/* <ListItemButton>
                <ListItemText>{t("profile")}</ListItemText>
            </ListItemButton> */}
              <ListItemButton component={Link} to="/quiz">
                <ListItemText>{t("quiz")}</ListItemText>
              </ListItemButton>
              <ListItemButton component={Link} to="/score">
                <ListItemText>{t("score")}</ListItemText>
              </ListItemButton>
              <ListItemButton component={Link} to="/logout">
                <ListItemText>{t("logout")}</ListItemText>
              </ListItemButton>
            </List>
            :
            <List>
              <ListItemButton component={Link} to="/login">
                <ListItemText>{t("login")}</ListItemText>
              </ListItemButton>
              <ListItemButton component={Link} to="/register">
                <ListItemText>{t("register")}</ListItemText>
              </ListItemButton>
            </List>
          }
        </Drawer>
        <IconButton
          sx={{ color: "white" }}
          onClick={() => setOpenDrawer(!openDrawer)}
        >
          <MenuIcon />
        </IconButton>
      </div>
    </React.Fragment>
  );
};

export default DrawerComp;
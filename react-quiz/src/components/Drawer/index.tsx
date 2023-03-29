import React, { useState, useContext } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { UserContext } from "../../UserContext";
import { Link } from 'react-router-dom';


const DrawerComp = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const user = useContext(UserContext);

  return (
    <React.Fragment>
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        {user?.isLoggedIn === true ? 
        <List>
            <ListItemButton>
                <ListItemText>Profile</ListItemText>
            </ListItemButton>
            <ListItemButton>
                <ListItemText>Quiz</ListItemText>
            </ListItemButton>
            <ListItemButton>
                <ListItemText>Score</ListItemText>
            </ListItemButton>
            <ListItemButton>
                <ListItemText>Logout</ListItemText>
            </ListItemButton>
            </List>
                :
            <List>
              <ListItemButton component={Link} to="/login">
                  <ListItemText>Login</ListItemText>
              </ListItemButton>
              <ListItemButton component={Link} to="/quiz">
                  <ListItemText>Register</ListItemText>
              </ListItemButton>
            </List>
          }
      </Drawer>
      <IconButton
        sx={{ color: "white", marginLeft: "auto" }}
        onClick={() => setOpenDrawer(!openDrawer)}
      >
        <MenuIcon />
      </IconButton>
    </React.Fragment>
  );
};

export default DrawerComp;
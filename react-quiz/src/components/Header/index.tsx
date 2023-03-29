import React, { useState, useContext, useEffect  } from "react";
import {
  AppBar,
  Button,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
  Select,
  MenuItem
} from "@mui/material";
import DrawerComp from "../Drawer"

import { Link } from 'react-router-dom';
import { UserContext } from "../../UserContext";

import i18next from "i18next";
import { useTranslation } from "react-i18next";

const Header = () => {
  const [value, setValue] = useState();
  const theme = useTheme();
//   console.log(theme);
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
//   console.log(isMatch);

    const { i18n, t } = useTranslation(["common"]);
    const lng = localStorage.getItem("i18nextLng");
    useEffect(() => {
        if (lng && lng.length> 2) {
        i18next.changeLanguage("en");
        }
    }, []);

        const handleLanguageChange = (e: any) => {
            i18n.changeLanguage(e.target.value);
        };

  //for handling user
  const user = useContext(UserContext);

  return (
    <React.Fragment>
      <AppBar sx={{ background: "#063970" }}>
        <Toolbar>
          {isMatch ? (
            <>
              <Typography sx={{ fontSize: "2rem", paddingLeft: "10%"}}>
                Gorin
              </Typography>
              <DrawerComp />
            </>
          ) : (
            <>
            {user?.isLoggedIn === true ? 
              <Tabs
                sx={{ marginLeft: "auto" }}
                indicatorColor="secondary"
                textColor="inherit"
                value={value}
                onChange={(e, value) => setValue(value)}
              >

                <Tab label="Quiz" />
                <Tab label="Score" />
                
              </Tabs>
              :null
            }

                {user?.isLoggedIn === true? 
                    <Button sx={{ marginLeft: "auto" }} variant="contained">
                        <Link color="white" to="/logout">Logout</Link>
                    </Button>
                     : 
                    <div>
                    <Button sx={{ marginLeft: "auto" }} variant="contained">
                    <Link color="white" to="/login">Login</Link>
                    </Button>
                    <Button sx={{ marginLeft: "10px" }} variant="contained">
                    <Link to="/register">Register</Link>
                    </Button>
                    </div>
                 }
                 <Select
                    labelId="language-select-label"
                    id="language-select"
                    value={localStorage.getItem("i18nextLng")}
                    onChange={handleLanguageChange}
                    sx={{ backgroundColor: "#333", color: "#fff", marginRight: 2 }}
                    >
                    <MenuItem value="en">English</MenuItem>
                    <MenuItem value="hu">Magyar</MenuItem>
                </Select>
              
            </>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Header;
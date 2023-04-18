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
  const [value, setValue] = useState("/");
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

    const { i18n, t } = useTranslation(["header"]);
    const lng = localStorage.getItem("i18nextLng");
    useEffect(() => {
        if (lng && lng.length> 2) {
        i18next.changeLanguage("hu");
        }
    }, []);

    const handleLanguageChange = (e: any) => {
        i18n.changeLanguage(e.target.value);
    };

    const handleChange = (event: any, newValue: any) => {
      setValue(newValue);
    };

  //for handling user
  const user = useContext(UserContext);

  return (
    <React.Fragment>
      <AppBar sx={{ background: "#063970" }}>
        <Toolbar>
          {isMatch ? (
            <>
              <Typography sx={{ fontSize: "2rem", paddingLeft: "auto", color:"white"}}>
                Gorin
              </Typography>
              <DrawerComp />
            </>
          ) : (
            <>
            {user.isLoggedIn === true ? 
              <Tabs
                sx={{ marginLeft: "auto" }}
                indicatorColor="secondary"
                textColor="inherit"
                value={value}
                onChange={handleChange}
              >
                <Tab label={t("home")} value="/" component={Link} to={"/"} />
                <Tab label={t("quiz")} value="/quiz" component={Link} to={"/quiz"}/>
                <Tab label={t("score")} value="/score" component={Link} to={"/score"}/>
              </Tabs>
               :null
             }

                {user.isLoggedIn === true? 
                    <Button sx={{ marginLeft: "auto" }} variant="contained">
                        <Link color="white" to="/logout">{t("logout")}</Link>
                    </Button>
                     : 
                    <div>
                    <Button sx={{ marginLeft: "auto" }} variant="contained">
                    <Link color="white" to="/login">{t("login")}</Link>
                    </Button>
                    <Button sx={{ marginLeft: "10px" }} variant="contained">
                    <Link to="/register">{t("register")}</Link>
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
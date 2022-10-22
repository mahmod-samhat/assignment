import React from "react";
import { Tabs, Tab, useTheme, useMediaQuery } from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ContactPageRoundedIcon from "@mui/icons-material/ContactPageRounded";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface NavProps {}

const Navbar: React.FC<NavProps> = () => {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("sm"));
  const [tabValue, setTabValue] = useState(0);
  const navigate = useNavigate();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  return (
    <>
      <Tabs
        TabIndicatorProps={{
          style: { background: theme.primary.main },
        }}
        textColor="inherit"
        value={tabValue}
        onChange={handleChange}
        sx={{ paddingBottom: "5px" }}
      >
        <Tab
          icon={<HomeRoundedIcon />}
          iconPosition="start"
          label="Home"
          onClick={() => navigate("/")}
        ></Tab>

        <Tab
          icon={<ContactPageRoundedIcon />}
          iconPosition="start"
          label="Users"
          onClick={() => navigate("/users")}
        ></Tab>
     
      </Tabs>
    </>
  );
};
export default Navbar;

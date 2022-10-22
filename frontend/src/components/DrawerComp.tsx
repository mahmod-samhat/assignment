import React from "react";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ContactPageRoundedIcon from "@mui/icons-material/ContactPageRounded";
import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Box,
} from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface HeaderProps {}

const DrawerComp: React.FC<HeaderProps> = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  return (
    <>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <List>
          <ListItemButton>
            <ListItemIcon>
              <Box
                component="img"
                alt="Haat Logo"
                src="https://www.haat.delivery/assets/logo.svg"
              />
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton onClick={() => navigate("/")}>
            <ListItemIcon>
              <ListItemText>
                <HomeRoundedIcon /> Home
              </ListItemText>
            </ListItemIcon>
          </ListItemButton>

          <ListItemButton onClick={() => navigate("/users")}>
            <ListItemIcon>
              <ListItemText>
                <ContactPageRoundedIcon />
                Users
              </ListItemText>
            </ListItemIcon>
          </ListItemButton>
        </List>
      </Drawer>
      <IconButton
        sx={{ marginLeft: "auto", color: "rgb(255,186,40)" }}
        onClick={() => setOpen(true)}
      >
        <MenuRoundedIcon />
      </IconButton>
    </>
  );
};
export default DrawerComp;

import React, { FC } from "react";
import {
  Card,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { dataMenu } from "./SidebarData/dataMenu";

const Menu: FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Card
        variant="outlined"
        sx={{ padding: 1, backgroundColor: "#F1F7FA", marginBottom: 3 }}
      >
        <List>
          {dataMenu.map((el) => (
            <ListItemButton key={el.link}>
              <ListItemButton onClick={() => navigate(el.link)}>
                <ListItemIcon>
                  <el.icon />
                </ListItemIcon>
                <ListItemText primary={el.title} />
              </ListItemButton>
            </ListItemButton>
          ))}
        </List>
      </Card>
    </div>
  );
};

export default Menu;

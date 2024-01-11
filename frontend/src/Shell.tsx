import { ReactElement } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import MuiContainer from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
// import InboxIcon from "@mui/icons-material/MoveToInbox";

const drawerWidth = 240;

interface ContainerProps {
  title: string;
  children: ReactElement;
}

const Container = ({ title, children }: ContainerProps) => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          {/* <ListItem disablePadding>
            <ListItemButton component={"a"} href="/">
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={"Dashboard"} />
            </ListItemButton>
          </ListItem> */}
          <ListItem disablePadding>
            <ListItemButton component={"a"} href="/planner">
              {/* <ListItemIcon>
                <InboxIcon />
              </ListItemIcon> */}
              <ListItemText primary={"Planner"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={"a"} href="/meals">
              {/* <ListItemIcon>
                <InboxIcon />
              </ListItemIcon> */}
              <ListItemText primary={"Meals"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={"a"} href="/ingredients">
              {/* <ListItemIcon>
                <InboxIcon />
              </ListItemIcon> */}
              <ListItemText primary={"Ingredients"} />
            </ListItemButton>
          </ListItem>
          {/* <ListItem disablePadding>
            <ListItemButton component={"a"} href="/shopping-list">
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={"Shopping List"} />
            </ListItemButton>
          </ListItem> */}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
          p: 3,
        }}
      >
        <Toolbar />
        <MuiContainer>{children}</MuiContainer>
      </Box>
    </Box>
  );
};

export default Container;

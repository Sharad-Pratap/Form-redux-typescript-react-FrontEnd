import React, { CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectAuth, logout } from "../features/authSlice";
import { toast } from "react-toastify";
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";
import styles from "./styles.module.css";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const Dashboard = () => {
  const { username } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    toast.success("User Logout Successfully");
    navigate("/auth");
  };

  const classes = useStyles();
  // return (
  //   <section
  //     className="vh-100 gradient-custom"
  //     style={{
  //       display: "flex",
  //       justifyContent: "center",
  //       alignItems: "center",
  //     }}
  //   >
  //     <div className="container h-70 vw-100" style={{ maxWidth: 500 }}>
  //       <div className="row d-flex justify-content-center align-items-center h-100">
  //         <div className="col-12 col-md-8 col-1g-6 col-xl-5"></div>
  //         <div
  //           className="card bg-dark text-white"
  //           style={{ borderRadius: "1rem" }}
  //         >
  //           <div className="card-body p-4 text-center">
  //             <div className="mb-md-5 mt-md-4 pb-5">
  //               <h2 className="fw-bold mb-2">Welcome to the Dashboard</h2>
  //               <h4>Name : {username}</h4>
  //               <button
  //                 className="btn btn-outline-light btn-lg px-5 mt-3"
  //                 type="button"
  //                 onClick={handleLogout}
  //               >
  //                 Logout
  //               </button>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </section>
  // );

  return (
    <div className={classes.root}>
      {/* App Bar */}
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <List>
          <ListItem button>
            <ListItemText primary="Item 1" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Item 2" />
          </ListItem>
          {/* Add more items as needed */}
        </List>
      </Drawer>

      {/* Main Content */}
      <main className={classes.content}>
        <Toolbar />
        <div>
          <h2>Welcome to the Dashboard</h2>
          <h4>Name: {username}</h4>
          <button
            className="btn btn-outline-light btn-lg px-5 mt-3"
            type="button"
            onClick={handleLogout}
            style={{ opacity: 1, backgroundColor: "#007BFF", color: "#ffffff" }}
          >
            Logout
          </button>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

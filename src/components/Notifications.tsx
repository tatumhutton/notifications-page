/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx } from "@emotion/react";
import React, { useState, useEffect } from "react";
import {
  Alert,
  Grid,
  Typography,
  AppBar,
  Menu,
  MenuItem,
  Toolbar,
  IconButton,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MenuIcon from "@mui/icons-material/Menu";

export type Notification = {
  id: string;
  message: string;
  date: string;
};

const styles = {
  dateText: {
    textAlign: "end" as const,
  },
  notificationsGrid: {
    marginTop: "12px",
  },
  notification: {
    width: "40%",
  },
};

const Notifications: React.FC = () => {
  //all notifications
  const [notifications, setNotifications] = useState<Notification[]>([]);
  //notifications shown in alerts
  const [shownNotifications, setShownNotifications] = useState<Notification[]>(
    []
  );
  //menu anchor
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  function handleCloseNotification(id: string) {
    setShownNotifications(
      shownNotifications.filter((notification) => notification.id !== id)
    );
  }

  useEffect(() => {
    //retrieve notifications from local storage
    const storedNotifications = localStorage.getItem("notifications");
    if (storedNotifications) {
      setNotifications(JSON.parse(storedNotifications));
    }

    //get notifications from api
    const fetchNotifications = async () => {
      const response = await fetch("http://localhost:3001/api/notifications");
      const data = await response.json();
      setNotifications(data);
      setShownNotifications(data);
      //save in local storage
      localStorage.setItem("notifications", JSON.stringify(data));
    };

    fetchNotifications();
  }, []);

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Notifications Page
          </Typography>

          <div>
            <IconButton
              size="large"
              aria-label="notifications"
              aria-controls="notification-menu"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <NotificationsIcon />
            </IconButton>
            <Menu
              id="notification-menu"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {notifications.map((notification, index) => (
                <MenuItem divider key={index}>
                  <Grid container>
                    <Grid item xs={12} style={styles.dateText}>
                      <Typography variant="body2" color="text.secondary">
                        {notification.date}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography
                        whiteSpace="break-spaces"
                        variant="subtitle1"
                        gutterBottom
                      >
                        {notification.message}
                      </Typography>
                    </Grid>
                  </Grid>
                </MenuItem>
              ))}
            </Menu>
          </div>
        </Toolbar>
      </AppBar>

      <Grid
        container
        direction="column"
        spacing={1}
        style={styles.notificationsGrid}
        alignContent="center"
      >
        {shownNotifications.map((notification, index) => (
          <Grid item style={styles.notification} key={notification.id}>
            <Alert
              severity="info"
              onClose={() => handleCloseNotification(notification.id)}
            >
              {notification.message}
            </Alert>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Notifications;

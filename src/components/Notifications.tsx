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
  testStyle: {
    backgroundColor: "black",
  },
  dateText: {
    textAlign: "end" as const,
  },
  notificationsGrid: {
    marginTop: "12px",
  },
  notification: {
    width: "30%",
  },
};

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [shownNotifications, setShownNotifications] = useState<Notification[]>(
    []
  );
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  function handleCloseNotification(id: string) {
    setShownNotifications(shownNotifications.filter((n) => n.id !== id));
  }

  useEffect(() => {
    const storedNotifications = localStorage.getItem("notifications");
    if (storedNotifications) {
      setNotifications(JSON.parse(storedNotifications));
    }

    const fetchNotifications = async () => {
      const response = await fetch("http://localhost:3001/api/notifications");
      const data = await response.json();
      console.log(data);
      setNotifications(data);
      setShownNotifications(data);
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
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <NotificationsIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {notifications.map((notification, index) => (
                <div>
                  <MenuItem divider>
                    <Grid container>
                      <Grid item xs={12} style={styles.dateText}>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          component="div"
                        >
                          {notification.date}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="subtitle1" gutterBottom>
                          {notification.message}
                        </Typography>
                      </Grid>
                    </Grid>
                  </MenuItem>
                </div>
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
          <Grid item style={styles.notification}>
            <Alert
              severity="info"
              key={notification.id}
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

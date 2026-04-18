import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useLocation, useParams } from "react-router-dom";

import "./styles.css";
import models from "../../modelData/models";

/**
 * Define TopBar, a React component of Project 4.
 */
function TopBar() {
  const location = useLocation();

  let contextText = "";

  const pathParts = location.pathname.split("/");
  const userId = pathParts[2];

  if (userId) {
    const user = models.userModel(userId);

    if (user) {
      if (
        location.pathname.startsWith("/user/") &&
        !location.pathname.includes("/photosOfUser")
      ) {
        contextText = `${user.first_name} ${user.last_name}`;
      }

      if (location.pathname.includes("/photos")) {
        contextText = `Photos of ${user.first_name} ${user.last_name}`;
      }
    }
  }

  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "85%",
        }}
      >
        <Typography variant="h5" color="inherit">
          Nguyễn Minh Hồng
        </Typography>

        <Typography variant="h6" color="inherit">
          {contextText}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;

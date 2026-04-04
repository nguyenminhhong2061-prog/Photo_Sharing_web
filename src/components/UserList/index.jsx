// UserList.jsx
import React, { useEffect, useState } from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  TextField,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";

import "./styles.css";
import fetchModel from "../../lib/fetchModelData";

/**
 * Define UserList, a React component of Project 4.
 */
function UserList() {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    async function loadUsers() {
      const data = await fetchModel("/user/list");

      if (data) {
        setUsers(data);
      }
    }

    loadUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();

    return fullName.includes(searchText.toLowerCase());
  });

  return (
    <div>
      {/* <Typography variant="body1" sx={{ mb: 2 }}>
        This is the user list, which takes up 3/12 of the window.
      </Typography> */}

      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          label="Search user by name"
          variant="outlined"
          size="small"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </Box>

      <List component="nav">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((item) => (
            <React.Fragment key={item._id}>
              <ListItem disablePadding>
                <ListItemButton component={Link} to={`/users/${item._id}`}>
                  <ListItemText
                    primary={`${item.first_name} ${item.last_name}`}
                  />
                </ListItemButton>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))
        ) : (
          <Typography variant="body2" sx={{ p: 2 }}>
            No users found
          </Typography>
        )}
      </List>
    </div>
  );
}

export default UserList;

// UserDetail.jsx
import React, { useEffect, useState } from "react";
import { Typography, Card, CardContent, Button } from "@mui/material";

import "./styles.css";
import { useParams, Link } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";

/**
 * Define UserDetail, a React component of Project 4.
 */
function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function loadUser() {
      const data = await fetchModel(`/user/${userId}`);

      if (data) {
        setUser(data);
      }
    }

    loadUser();
  }, [userId]);

  if (!user) {
    return <Typography variant="body1">User not found</Typography>;
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          {user.first_name} {user.last_name}
        </Typography>

        <Typography variant="body1" gutterBottom>
          Location: {user.location}
        </Typography>

        <Typography variant="body1" gutterBottom>
          Occupation: {user.occupation}
        </Typography>

        <Typography variant="body1" gutterBottom>
          Description: {user.description}
        </Typography>

        <Button
          variant="contained"
          component={Link}
          to={`/photos/${user._id}`}
          sx={{ mt: 2 }}
        >
          View Photos
        </Button>
      </CardContent>
    </Card>
  );
}

export default UserDetail;

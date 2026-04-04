// UserPhotos.jsx
import React, { useEffect, useState } from "react";
import { Typography, Card, CardContent, Divider } from "@mui/material";

import "./styles.css";
import { useParams, Link } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";

/**
 * Define UserPhotos, a React component of Project 4.
 */
function UserPhotos() {
  const { userId } = useParams();
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    async function loadPhotos() {
      const data = await fetchModel(`/photosOfUser/${userId}`);

      if (data) {
        setPhotos(data);
      }
    }

    loadPhotos();
  }, [userId]);

  if (!photos || photos.length === 0) {
    return (
      <Typography variant="body1">No photos found for this user.</Typography>
    );
  }

  return (
    <div>
      {photos.map((photo) => (
        <Card key={photo._id} sx={{ mb: 3 }}>
          <img
            src={require(`../../images/${photo.file_name}`)}
            alt="userPhoto"
            style={{
              width: "100%",
              display: "block",
            }}
          />

          <CardContent>
            <Typography variant="body2" gutterBottom>
              Uploaded: {new Date(photo.date_time).toLocaleString()}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" gutterBottom>
              Comments
            </Typography>

            {!photo.comments || photo.comments.length === 0 ? (
              <Typography variant="body2">No comments yet.</Typography>
            ) : (
              photo.comments.map((comment) => (
                <div key={comment._id} style={{ marginBottom: "16px" }}>
                  <Typography variant="body2">
                    <Link to={`/users/${comment.user._id}`}>
                      {comment.user.first_name} {comment.user.last_name}
                    </Link>
                  </Typography>

                  <Typography variant="caption" display="block" gutterBottom>
                    {new Date(comment.date_time).toLocaleString()}
                  </Typography>

                  <Typography variant="body1">{comment.comment}</Typography>

                  <Divider sx={{ mt: 1 }} />
                </div>
              ))
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default UserPhotos;

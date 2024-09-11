const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");
const app = express();
app.use(bodyParser.json());
app.use(cors());
const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  console.log("inside get commments: ");
  const comments = commentsByPostId[req.params.id] || [];
  console.log({ commentsByPostId, comments });
  res.status(200).send(comments);
});

app.post("/posts/:id/comments", async (req, res) => {
  const { content } = req.body;
  const postId = req.params.id;
  const id = Date.now();

  const comments = commentsByPostId[postId] || [];
  comments.push({ content, id, status: "pending" });
  commentsByPostId[postId] = comments;

  await axios.post("http://localhost:4005/events", {
    type: "CommentCreated",
    data: {
      id,
      content,
      postId,
      status: "pending",
    },
  });

  res.status(201).send(comments);
});

app.post("/events", async (req, res) => {
  console.log("previous data", { commentsByPostId });
  const { type, data } = req.body;
  if (type === "CommentModerated") {
    const { id, postId, status, content } = data;
    const comments = commentsByPostId[postId];
    const comment = comments.find((comment) => comment.id === id);
    comment.status = status;
    await axios.post("http:localhost:4005/events", {
      type: "CommentUpdated",
      data: {
        id,
        postId,
        content,
        status,
      },
    });
  }
  console.log("new data", { commentsByPostId });

  res.send({});
});

app.listen(4001, () => console.log("Listening comments on ", 4001));

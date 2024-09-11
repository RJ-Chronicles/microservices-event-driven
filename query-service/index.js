const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

const handleEvents = (type, data) => {
  if (type === "PostCreated") {
    const { title, id } = data;
    posts[id] = { id, title, comments: [] };
  }
  if (type === "CommentCreated") {
    console.log({ posts, data });
    const { postId, content, id, status } = data;
    if (posts[postId]) {
      posts[postId].comments.push({ id, content, status });
    }
  }

  if (type === "CommentUpdated") {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    const comment = post.comments.find((comment) => comment.id === id);
    comment.status = status;
    comment.content = content;
  }
};
app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  handleEvents(type, data);
  console.log(posts);
  res.send({});
});

app.listen(4002, async () => {
  console.log("Listening Query on ", 4002);
  try {
    const response = await axios.get("http://localhost:4005/events");
    for (const event of response.data) {
      console.log("Proccessing event : ", event.type);
      handleEvents(event.type, event.data);
    }
  } catch (err) {}
});

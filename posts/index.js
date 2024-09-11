const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.use;
app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts", async (req, res) => {
  const { title } = req.body;
  const id = Date.now();
  posts[id] = {
    id,
    title,
  };
  try {
    const response = await axios.post("http://localhost:4005/events", {
      type: "PostCreated",
      data: {
        id,
        title,
      },
    });
    console.log(response.data);
  } catch (err) {
    console.log(err);
  }
  res.status(201).send(posts[id]);
});

app.post("/events", async (req, res) => {
  console.log("received Events: ", req.body.type);
  res.send({});
});

app.listen(4000, () => console.log("Listening Posts on", 4000));

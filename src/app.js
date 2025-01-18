const express = require("express");

const port = 7777;
const app = express();

app.use("/hello", (req, res) => {
  res.send("its hello first resolution");
});

app.use("/hello/1", (req, res) => {
  res.send("im hello/1 request");
});

app.get("/test", (req, res) => {
  res.send("test url got hit on the way");
});

app.get("/", (req, res) => {
  res.send("Server home url with node mon");
});

app.listen(port, () => {
  console.log("Server started successfully at port number " + port);
});

// Give home url at the end as it taking from top to bottom for url resolution, Even one level down also consider for resolution
// /hello/1, /hello when user hits with /hello/2 it resolves to second one.

// for evry time restart node app for small change is too difficult whyile on development time. to avoid use nodemon package to do autoreload.

// instead run app file every time use npm run start, npm run dev on package.json file.

// https://stackoverflow.com/questions/22343224/whats-the-difference-between-tilde-and-caret-in-package-json
// ~ used to update latest patch verion 1.2.X < 1.3.0
// ^ used to update latest minor & patch version 1.x.x < 2.0.0

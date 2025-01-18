const express = require("express");

const port = 7777;
const app = express();

// optional
app.get("/user/ab?c", (req, res) => {
  res.send("? optional testing, ab?c b is optional");
});
// multiple numbers
app.get("/user/xy+z", (req, res) => {
  res.send("Multiple xy+z can have multiple y in between");
});
// wildcards
app.get("/user/j*k", (req, res) => {
  res.send("* as wildcard have anything between j and k");
});
// regex fly as ending one
app.get(/.*fly$/, (req, res) => {
  res.send("word only ends with fly matches on this route");
});

// Query in url
app.get("/userQuery", (req, res) => {
  console.log(req.query);
  res.send("Query url fetching api");
});
// param in url
app.get("/userParam/:userID/:pwd/", (req, res) => {
  console.log(req.params);
  res.send("userParam fetching api");
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

// diff between app.use vs app.get
//https://github.com/rohan-paul/Awesome-JavaScript-Interviews/blob/master/Node-Express/app.use-vs-app.get.md

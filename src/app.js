const express = require("express");

const port = 7777;
const app = express();

app.listen(port, () => {
  console.log("Server started successfully at port number " + port);
});

// Each change need to restart server
app.use("/test", (req, res) => {
  res.send("test url got hit on the way");
});

// Give home url at the end as it taking from top to bottom for url resolution
app.use((req, res) => {
  res.send("Server home url with node mon");
});

// for evry time restart node app for small change is too difficult whyile on development time. to avoid use nodemon package to do autoreload.

// instead run app file every time use npm run start, npm run dev on package.json file.

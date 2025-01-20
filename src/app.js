const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth");

const port = 7777;
const app = express();

// Error handling
//1. Order of error block matters, first block home url block never called as no at that time.
//2. Second /getError called ==>throw error method send request to / second homeurl (this happens only if there is no try/catch in /geterror call).
// 3. Second /getError called ==>throw error method called try/catch in /geterror method makes error call managed in same catch block never called second home url.

app.use("/", (err, req, res, next) => {
  console.log("Entering into home url");
  if (err) {
    res.status(500).send("Something wrong on server");
  }
});

app.get("/getError", (req, res, next) => {
  console.log("Entering into error url");
  // case2
  // throw new Error("Test error");
  // res.send("Error response");
  // case3
  try {
  } catch {
    console.log("Entering into catch block");
    res.status(500).send("Something wrong on server get Error method");
  }
});
// if error not handled on the top most methods, then this will be called and showed generic error message.
app.use("/", (err, req, res, next) => {
  console.log("Entering into second home url");
  if (err) {
    res.status(500).send("Something wrong on server" + " ==> " + err);
  }
});

// admin endpoints

app.use("/admin", adminAuth);

app.use("/admin/getAllData", (req, res, next) => {
  console.log("Entering into getalldata method");
  res.send("All data shown to admin user");
});

app.use("/admin/single", (req, res, next) => {
  console.log("Entering into single method");
  res.send("All single data to admin user");
});

app.get("/user", userAuth, (req, res) => {
  console.log("Enter into user get operation");
  res.send("Send response for user operation");
});
app.get("/user/login", (req, res) => {
  console.log("Enter into user login operation");
  res.send("Send response for user login operation");
});

// app.use(
//   "/user",
//   (req, res, next) => {
//     console.log("Response 1!!");
//     //res.send("Its chainning response test response1");
//     next();
//   },
//   (req, res, next) => {
//     console.log("Response 2!!");
//     res.send("Its chainning response 2");
//     next();
//   }
// );

// use case 7
app.use("/test", (req, res, next) => {
  console.log("Response 1!!");
  //res.send("Its chainning response test response1");
  next();
});

app.use("/test", (req, res, next) => {
  console.log("Response 2!!");
  res.send("Its chainning response 2");
  next();
});
//Js is single threaded language
// 1. no res.send in app.use ==> browser stuck in infinite loop (waiting for response)
// 2. First: res.send,next Second: res.send,next Output: First Reponse, Second error
// 3. First: next,res.send Second: res.send,next Output: First Error, Second Response
// 4. First: next Second: res.send,next Output: First Log, Second Response
// 5. First: next Second: next Output: No method found
// 6. can have array of chaining, it can be any order(l1,[l2,l3],l4,l5)
// 7. It can be divided into two different call, call hirerachy matters.

// // optional
// app.get("/user/ab?c", (req, res) => {
//   res.send("? optional testing, ab?c b is optional");
// });
// // multiple numbers
// app.get("/user/xy+z", (req, res) => {
//   res.send("Multiple xy+z can have multiple y in between");
// });
// // wildcards
// app.get("/user/j*k", (req, res) => {
//   res.send("* as wildcard have anything between j and k");
// });
// // regex fly as ending one
// app.get(/.*fly$/, (req, res) => {
//   res.send("word only ends with fly matches on this route");
// });

// // Query in url
// app.get("/userQuery", (req, res) => {
//   console.log(req.query);
//   res.send("Query url fetching api");
// });
// // param in url
// app.get("/userParam/:userID/:pwd/", (req, res) => {
//   console.log(req.params);
//   res.send("userParam fetching api");
// });

// app.get("/", (req, res) => {
//   res.send("Server home url with node mon");
// });

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

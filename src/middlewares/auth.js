const adminAuth = (req, res, next) => {
  console.log("Entering into adminAuth method");
  const authToken = "xyz";
  const isAuthorized = authToken === "xyz";
  if (!isAuthorized) {
    res.status(401).send("Not authorized to access admin page");
  } else {
    next();
  }
};

const userAuth = (req, res, next) => {
  console.log("Entering into userAuth method");
  const authToken = "xyz";
  const isAuthorized = authToken === "xyz1";
  if (!isAuthorized) {
    res.status(401).send("Not authorized to access user page");
  } else {
    next();
  }
};

module.exports = { adminAuth, userAuth };

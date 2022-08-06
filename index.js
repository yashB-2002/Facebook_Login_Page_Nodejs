const express = require("express");
const app = express();
// for creating session
const session = require("express-session");
// uuid is unique id assosiated with a particular user that is logged in
const { v4: uuidv4 } = require("uuid");
const path = require("path");
// body parser is used to get data from form tag
const { urlencoded } = require("body-parser");
const mainFile = path.join(__dirname);
// to serve static file
app.use(express.static(mainFile));
app.use(express.urlencoded({ extended: true }));
// setup session
app.use(
  session({ secret: `${uuidv4}`, resave: true, saveUninitialized: true })
);
// defining some user credentials which willbe checked at time of login
const userData = {
  email: "anything",
  password: "anything",
};
// home route
app.get("/", (req, res) => {
  res.sendFile(mainFile + "/index.html");
});
// post request after submitting details
app.post("/form_submit", (req, res) => {
  if (
    req.body.email === userData.email &&
    req.body.password === userData.password
  ) {
    req.session.mail = req.body.email;
    res.send("logged in success by this email " + req.session.mail);
  } else {
    res.send("Incorrect Email/Password");
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    console.log("session destroyed");
  });
  res.send("logged out successfully");
});
app.listen(4000, (err) => {
  if (!err) console.log("listening to port 4000 :)");
});

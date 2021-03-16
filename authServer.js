require("dotenv").config;

const express = require("express");
const app = express();

const jwt = require("jsonwebtoken");

// the application actually use json, make sure express server can handle it
app.use(express.json());

app.post('/token', (req,res) => {
  const refreshToken = req.body.token

})

app.post("/login", (req, res) => {
  // Authenticated user
  const username = req.body.username;
  const user = { name: username };

  const accessToken = generateAccessToken(user)
  const refreshToken = jwt.sign(user, "" + process.env.REFRESH_TOKEN_SECRET)
  res.json({ accessToken: accessToken, refreshToken: refreshToken });
});

function generateAccessToken(user) {
  return jwt.sign(user, "" + process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15s",
  });
}

app.listen(4000);

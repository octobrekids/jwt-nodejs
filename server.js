require('dotenv').config

const express = require("express");
const app = express();

const jwt = require("jsonwebtoken");

// the application actually use json, make sure express server can handle it
app.use(express.json());

const posts = [
  {
    username: "Kyle",
    title: "Post 1",
  },
  {
    username: "Jimmy",
    title: "Post 2",
  },
];

app.get("/posts", authenticateToken, (req, res) => {
  res.json(posts.filter(post => post.username === req.user.name));
});

app.post("/login", (req, res) => {
  // Authenticated user
  const username = req.body.username;
  const user = { name: username };

  const accessToken = jwt.sign(user, "" + process.env.ACCESS_TOKEN_SECRET);
  res.json({ accessToken: accessToken });
});

function authenticateToken(req,res,next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    // they haven't send a token to us
    if (token == null) return res.sendStatus(401)

    jwt.verify(token,"" + process.env.ACCESS_TOKEN_SECRET, (err,user) => {
        // token no longer valid
        console.log(err)
        if(err) return res.sendStatus(403) 

        req.user = user
        next()
    })
}

app.listen(3000);

// implement your API here
const express = require("express");
const Users = require("./data/db.js");
const server = express();
server.use(express.json());
server.get("/", (req, res) => {
  res.send("Hello World");
});

//Get all users
server.get("/api/users", (req, res) => {
  Users.find()
    .then(users => {
      res.send(users);
      // res.status(200).json(users);
    })
    .catch(error => {
      res.send(error);
      // res.status(500).json({ message: "error getting users" });
    });
});

//Get users by Id
server.get("/api/users/:id", (req, res) => {
  const id = req.params.id;
  Users.findById(id)
    .then(users => {
      res.send(users);
      // res.status(200).json(users);
    })
    .catch(error => {
      res.send(error);
      // res.status(500).json({ message: "error getting users" });
    });
});

//Add a Users
server.post("/api/users", (req, res) => {
  const usersData = req.body;
  if (!usersData.name) {
    res.status(400).json({ message: "a user needs a name" });
  } else {
    Users.insert(usersData)
      .then(user => {
        res.json(user);
        // res.status(200).json(users);
      })
      .catch(error => {
        res.json({ message: "There was a error adding a user" });
      });
  }
});
//Update a Users
server.put("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  Users.update(id, changes)
    .then(user => {
      res.json(user);
      // res.status(200).json(users);
    })
    .catch(error => {
      res.json({ message: "There was a error removing a user" });
    });
});
//Delete a users

server.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;
  Users.remove(id)
    .then(user => {
      res.json(user);
      // res.status(200).json(users);
    })
    .catch(error => {
      res.json({ message: "There was a error removing a user" });
    });
});

const port = 8000;
server.listen(port, () => console.log("\nApi Server is Up and Running\n"));

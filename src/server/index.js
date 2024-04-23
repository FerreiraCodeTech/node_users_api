const express = require("express");
const dotEnv = require("dotenv");
const mongoose = require("mongoose");
const User = require("../models/mongo.js");

const app = express();
app.use(express.json());
dotEnv.config();

const serverPort = process.env.SERVER_PORT;
const dbUsername = process.env.DATABASE_USERNAME;
const dbPassword = process.env.DATABASE_PASSWORD;

app.get("/users/api", async (req, res) => {
  try {
    const dbData = await User.find({});
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(dbData);
  } catch (error) {
    res.status(500).send(`error ${error.message}`);
  }
});

app.post("/users/api", async (req, res) => {
  try {
    const createUser = await User.create(req.body);
    res.status(200).send(createUser);
  } catch (error) {
    res.status(500).send(`could not create a new user ${error.message}`);
  }
});

app.delete("/users/api/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const deleteUser = await User.findByIdAndDelete(userId);
    res.status(200).send(deleteUser);
  } catch (error) {
    res.status(500).send(`could not delete this user ${error.message}`);
  }
});

app.put("/users/api/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const updateUser = await User.findByIdAndUpdate(userId, req.body, {new: true});
    res.status(200).send(updateUser);
  } catch (error) {
    res.status(500).send(`could not update this user ${error.message}`);
  }
});

app.listen(serverPort, async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${dbUsername}:${dbPassword}@nodeapi.q8uwp4b.mongodb.net/?retryWrites=true&w=majority`
    );
    console.log("database connected");
    console.log(`server running at http://localhost:${serverPort}/users/api`);
  } catch (error) {
    console.error(`unable to connect to database ${error.message}`);
  }
});

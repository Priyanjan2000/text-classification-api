require("dotenv").config(); 
const express = require("express");
const classify = require("./classify");

const app = express();

app.use(express.json());

// only one route needed for assignment
app.post("/classify", classify);

app.listen(3000, () => {
  console.log("server running on 3000");
});

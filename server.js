require("dotenv").config({ path: ".env" });
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
require("mongoose");
require("./src/connections/mongodb");
const static_path = path.join(__dirname, '/public');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(static_path));

require("./src/api/router/index")(app)

const PORT = process.env.NODE_PORT;

app.listen(PORT, () => {
    console.log("Node Server Started on ----- ", PORT);
})
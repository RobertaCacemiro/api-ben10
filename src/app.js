const express = require("express");
const cors = require("cors");

const authRoutesV1 = require("./api/v1/routes/auth.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API Ben 10 online 🚀" });
});

app.use("/api/v1/auth", authRoutesV1);

module.exports = app;

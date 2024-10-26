require("dotenv").config();
const cookieParser = require("cookie-parser");

const express = require("express");
const cors = require("cors");
const router = express.Router();
const app = express();
const port = 8000;
const submit = require("./routes/form/submit");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// app.use(cors());
app.use(
  cors({
    credentials: true,
    origin: process.env.SITE_URL ?? "http://localhost:5173",
    optionsSuccessStatus: 200,
  })
);
app.use(express.json());
// app.use(cookieParser(process.env.SECRET_KEY));
app.use(cookieParser());
app.use("/form", submit);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

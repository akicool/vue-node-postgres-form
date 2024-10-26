const express = require("express");
const { submitController } = require("../../controllers/submitController");
const router = express.Router();

router.post("/createUser", (req, res) => {
  submitController?.createUser(req, res);
});

router.post("/getUser", (req, res) => {
  submitController?.getUser(req, res);
  // console.log("getUser", req?.body);
});

router.get("/getDecodedToken", (req, res) => {
  submitController?.getDecodedToken(req, res);
  // console.log("getUser", req?.body);
});

router.get("/getUsers", (req, res) => {
  submitController?.getUsers(req, res);
  // console.log("getUsers", req?.body);
});

module.exports = router;

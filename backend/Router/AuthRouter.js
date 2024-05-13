const express = require("express");
const {handleSignIn} = require("../Controller/AuthController.js");

const AuthRouter = express.Router();


AuthRouter.post("/signin",handleSignIn);












module.exports = AuthRouter;
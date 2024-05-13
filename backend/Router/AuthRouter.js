const express = require("express");
const {handleSignIn,handleLogin} = require("../Controller/AuthController.js");

const AuthRouter = express.Router();


AuthRouter.post("/signup",handleSignIn);
AuthRouter.post("/signin",handleLogin);












module.exports = AuthRouter;
const express = require("express");
const cors = require("cors");
const connect = require("./Database/db.js");
const AuthRouter = require("./Router/AuthRouter.js");

const app = express();

//middleware
app.use(cors());
app.use(express.json());


app.use("/api/v1/auth",AuthRouter);





















app.listen(4500,()=>
{

    connect();
    console.log('Server Running At Port 4500');
})
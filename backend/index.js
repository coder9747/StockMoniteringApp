const express = require("express");
const cors = require("cors");
const connect = require("./Database/db.js");
const AuthRouter = require("./Router/AuthRouter.js");
const dotenv = require("dotenv");
const WishListRouter = require("./Router/WatchListRouter.js");
const StockRouter = require("./Router/StockRouter.js");

const app = express();

//middleware
app.use(cors());
app.use(express.json());
dotenv.config();


app.use("/api/v1/auth",AuthRouter);
app.use("/api/v1/wishlist",WishListRouter);
app.use('/api/v1/stock',StockRouter);





















app.listen(4500,()=>
{

    connect();
    console.log('Server Running At Port 4500');
})
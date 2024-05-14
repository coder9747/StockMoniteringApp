const express = require('express');
const AuthMiddleware = require('../Middleware/AuthMiddleware.js');
const { getUserWatchList, removeSymbol, addUserSymbol } = require("../Controller/WatchListController.js");


const WishListRouter = express.Router();

WishListRouter.get("/get-user-watchlist",AuthMiddleware,getUserWatchList);
WishListRouter.post("/add-user-watchlist",AuthMiddleware,addUserSymbol);
WishListRouter.post("/remove-user-watchlist",AuthMiddleware,removeSymbol);







module.exports = WishListRouter;

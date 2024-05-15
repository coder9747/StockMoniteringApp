const express = require("express");
const {getChange,getIntradayStockData} = require("../Controller/StockController.js");

const StockRouter = express.Router();



StockRouter.get('/get-change',getChange);
StockRouter.get("/get-stock-data",getIntradayStockData);




module.exports = StockRouter;


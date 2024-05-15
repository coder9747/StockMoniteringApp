const express = require("express");
const {getChange,getIntradayStockData,getDummyStockData} = require("../Controller/StockController.js");

const StockRouter = express.Router();



StockRouter.get('/get-change',getChange);
StockRouter.get("/get-stock-data",getIntradayStockData);
StockRouter.get('/get-stock-dummy-data',getDummyStockData);



module.exports = StockRouter;


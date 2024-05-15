const calculateChange = (openPrice, closePrice) => {
    return ((closePrice - openPrice) / openPrice) * 100;
};

const formatChange = (change) => {
    return change > 0 ? `+${change.toFixed(2)}%` : `${change.toFixed(2)}%`;
};



const getChange = async (req, res) => {

    try {
        const { symbol } = req.query;
        if (symbol) {
            const apiKey = process.env.api_key;
            const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=60min&outputsize=compact&apikey=${apiKey}`);
            const data = await response.json();
            const metaData = data['Meta Data'];
            let tempArr = Object.values(data['Time Series (60min)']);
            const closingPrice = parseFloat(tempArr[0]['4. close']);
            const openingPrice = parseFloat(tempArr[tempArr.length - 1]['1. open']);
            const change = calculateChange(openingPrice, closingPrice);
            const formatedChange = formatChange(change);
            res.status(200)
                .json({
                    succes: true,
                    message: "ok",
                    data: {
                        metaData,
                        formatedChange,
                        openingPrice,
                        closingPrice,
                    }
                })
        }
        else {
            res.status(401)
                .json({
                    succes: false,
                    message: "Symbol Required",
                })
        }
    } catch (error) {
        res.status(500)
            .json({
                succes: false,
                message: "Internal Server Error",
            })
    }
}

const getIntradayStockData = async (req, res) => {
    try {
        const { symbol, interval } = req.query;
        if (symbol && interval) {
            const apiKey = process.env.api_key;
            const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=${interval}min&outputsize=compact&apikey=${apiKey}`);
            const data = await response.json();
            res.status(200)
                .json({
                    succes: true,
                    message: "Data Fetched Succes",
                    data,
                })
        }
        else {
            res.status(409)
                .json({
                    succes: false,
                    message: "symbol and interval required",
                })
        }

    } catch (error) {
        console.log(error.message);
        res.status(500)
            .json({
                succes: false,
                message: "Internal Server Error",
            })
    }
}


module.exports = { getChange, getIntradayStockData };
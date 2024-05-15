const WatchList = require("../Schema/WatchListSchema.js");

const getUserWatchList = async (req, res) => {
    try {
        const id = req.user._id;
        const UserWatchList = await WatchList.find({ userId: id });
        res.status(200)
            .json({
                payload: UserWatchList,
                succes: true,
                message: "Succes",
            })
    } catch (error) {
        res.status(500).json({
            succes: false,
            message: "Internal Server Error",
        })
    }
}

const addUserSymbol = async (req, res) => {

    try {
        const { symbol } = req.body;
        if (symbol) {
            const id = req.user._id;
            const userWatchList = await WatchList.findOne({ symbols: symbol, userId: id });
            if (!userWatchList) {
                const newUserSymbol = new WatchList({ symbols: symbol, userId: id });
                await newUserSymbol.save();
                res.status(200).json({
                    succes: true,
                    message: "Added To WatchList",
                })
            }
            else {
                res.status(409).json({
                    succes: false,
                    message: "Watch List Already Exists",
                })
            }

        }
        else {
            res.status(401).json({
                succes: false,
                message: "Symbol Required",
            })
        }
    } catch (error) {
        res.status(500).json({
            succes: false,
            message: "Internal Server Error",
        })
    }

}

const removeSymbol = async (req, res) => {
    try {
        const { id } = req.body;
        const isWatchListExists = await WatchList.findById(id);
        if (isWatchListExists) {
            await WatchList.findByIdAndDelete(id);
            res.status(200).json({
                succes: true,
                message: "Deleted Succesful",
            })
        }
        else {
            res.status(404).json({
                succes: false,
                message: "WatchList Not Found",
            })
        }

    } catch (error) {
        res.status(500).json({
            succes: false,
            message: "Internal Server Error",
        })
    }
}


module.exports = { getUserWatchList, removeSymbol, addUserSymbol };
const mongoose = require("mongoose");

const WatchList = mongoose.Schema({
    symbols: {
        type: String,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    }
}, { timestamps: true });

const WatchListModal = new mongoose.model("wishlist", WatchList);

module.exports = WatchListModal;
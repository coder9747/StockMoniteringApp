const mongoose = require("mongoose");
const url = 'mongodb+srv://pratyushkarn007:gullyislove123@cluster0.gai8t14.mongodb.net/stock-mon'
const connect = async () => {
    try {
        await mongoose.connect(url);
        console.log('Database Connected Succesful');
    } catch (error) {
        console.log(error.message);
        console.log('Failed to connect to database');
    }
}

module.exports = connect;

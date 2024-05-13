const mongoose = require("mongoose");
const connect = async () => {
    try {
        await mongoose.connect(process.env.mongourl);
        console.log('Database Connected Succesful');
    } catch (error) {
        console.log(error.message);
        console.log('Failed to connect to database');
    }
}

module.exports = connect;

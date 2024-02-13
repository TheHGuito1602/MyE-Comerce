const mongoose = require('mongoose');

const connectDB = async() => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
    } catch(error){
        //console.log(`Error Connecting to MongoDB: ${error.message}`.red);
        console.error(error);
        process.exit(1);
    }
}

module.exports = connectDB;
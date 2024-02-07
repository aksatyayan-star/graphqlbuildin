const mongoose = require('mongoose');

const connectDB = async () => { //async call as mongoose functions are promises
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
};

module.exports = connectDB; //exporting this function, will be importing this in index.js file
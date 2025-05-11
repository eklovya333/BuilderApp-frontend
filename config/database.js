require("dotenv").config();
const mongoose = require('mongoose');

console.log("inside db.js");
const { MONGO_URI } = process.env;
mongoose.set('debug', true);

exports.connect = () => {
    mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
       // useCreateIndex: true,
        //useFindAndModify: false,
    }).then(()=>{
        console.log("Successfully connected");
    }).catch((error)=>{
        console.log("Not Successful connection!!!");
        console.error(error);
        process.exit(1);

    });
};
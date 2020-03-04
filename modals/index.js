/*
##################################################################
-- Name              : 
-- Creation Date     : 
-- Author            : 
##################################################################
*/
var fs = require("fs");
var mongoose = require('mongoose');
var Promise = require("bluebird");
var config = require('../config/config.json');
let mongoose_options = {};
if(process.env.NODE_ENV == "local"){
    mongoose_options  = {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        user:"",
        pass:""
    };
}else if(process.env.NODE_ENV == "staging"){
    mongoose_options  = {
        useNewUrlParser: true,
        user:config.staging.user,
        pass:encodeURIComponent(config.staging.pass)
    };
}


mongoose.connect("mongodb://localhost:27017/makeen?authSource=admin",mongoose_options,(err, res) => {
    if(err){
        console.log("error in connecting db");
        console.log(err)
    } else console.log("db connection established ")
});
var db = {};
fs
    .readdirSync(__dirname)
    .filter((file) => {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach((file) => {
        var cd = file.replace(".js", "");
        db[cd] = Promise.promisifyAll(require("./" + file)(mongoose));
    });

db.mongoose = mongoose;
mongoose.set('useCreateIndex', true)
module.exports = db;




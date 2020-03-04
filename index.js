'use strict';

var express = require("express");
const bodyParser = require('body-parser');
const app = express();
let config = require("./config/config");
let helmet = require("helmet");
var server = require('http').createServer(app);
const routes = require("./routes")(express);
let validate = require("./middleware/reqValidator");
let checkUser = require("./middleware/userAndPermissions");
let backendPort = '';
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({
  limit: '16mb'
}));
app.disable('x-powered-by');
app.use(helmet());

const myLoggers = require('log4js');

// for logging
myLoggers.configure({
    appenders: { mylogger: { type:"file", filename: "./log.txt" } },
    categories: { default: { appenders:["mylogger"], level:"ALL" } }
});

process.logger = myLoggers.getLogger();
process.logger.info('server started.');

switch(process.env.NODE_ENV) {
    case "local":
        backendPort = config.local.BackendPort;
        break;
    case "staging":
        backendPort = config.staging.BackendPort;
        break;
    case "production":
        backendPort = config.production.BackendPort;
        break;
    default:
    // code block
}

//cors handling
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, content-type, If-Modified-Since,cache-control");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

// user and permissions middleware
app.use(checkUser);

// Request validator middleware
app.use(validate);

Object.keys(routes).forEach((route) => {
console.log(route.toLowerCase())
  app.use("/" + route.toLowerCase(), routes[route])
});


app.start = app.listen = function(){
    return server.listen.apply(server, arguments)
}


app.start(backendPort, function() {
  console.log('Express server listening on port '+backendPort);
})









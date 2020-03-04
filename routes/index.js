/*
##################################################################
-- Name              :
-- Creation Date     :
-- Author            :
##################################################################
*/

module.exports = (app) => {

    var routes = {};
    var libs = require("../lib");

    var fs = require("fs");
    fs
      .readdirSync(__dirname)
      .filter((file) => {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
      })
      .forEach((file) => {
        var cd = file.replace(".js", "");
        routes[cd] = require("./" + file)(app, libs);
      });

    return routes;
  };

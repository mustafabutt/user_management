/*
##################################################################
-- Name              :reqValidator.js
-- Creation Date     :
-- Author            :Mustafa
##################################################################
*/

"use strict";

module.exports =  async (req,res,next) => {

    let C = require("../constants/constants")
    let _ = require("underscore");
    let roles = require("./roles")();
    let groups = require("./groupValidator")();
    let items = require("./itemValidator")();

    if(req){

        if(req.method == "POST" && req.originalUrl.includes("user")){

            if(!req.body.hasOwnProperty("email")){

                res.status(400).json({
                    status: false,
                    msg:C.BAD_REQUEST
                });
            }else {
                roles.checkRoles(req.body)
                    .then((res)=>{
                        next()
                    })
                    .catch((err)=>{
                        res.json(err);
                    })
            }

        }
        if(req.method == "PUT" && req.originalUrl.includes("user")){
            if(!req.body.hasOwnProperty("email") || !req.body.hasOwnProperty("roles") || !req.body.hasOwnProperty("_id") ){

                res.status(400).json({
                    status: false,
                    msg:C.BAD_REQUEST
                });
            }else {
                roles.checkRoles(req.body,req.method)
                    .then((res)=>{
                        next()
                    })
                    .catch((err)=>{
                        res.json(err);
                    })
            }
        }
        if(req.method == "DELETE" && req.originalUrl.includes("user")){
            if(!req.body.hasOwnProperty("roles") || !req.body.hasOwnProperty("_id") ){

                res.status(400).json({
                    status: false,
                    msg:C.BAD_REQUEST
                });
            }else {
                // it will check roles either group ids are valid or not
                roles.checkRoles(req.body)
                    .then((res)=>{
                        next()
                    })
                    .catch((err)=>{
                        res.json(err);
                    })
            }
        }

        if(req.method == "POST" && req.originalUrl.includes("group")){
            if(!req.body.hasOwnProperty("name")){

                res.status(400).json({
                    status: false,
                    msg:C.BAD_REQUEST
                });
            }else {
                // it will check groups either collection ids are valid or not
                groups.checkGroups(req.body.collectionIds)
                    .then((res)=>{
                        next();
                    })
                    .catch((err)=>{
                        console.log(err)
                        res.json(err);
                    })
            }
        }
        if(req.method == "PUT" && req.originalUrl.includes("group")){
            if(!req.body.hasOwnProperty("name") || !req.body.hasOwnProperty("collectionIds") || !req.body.hasOwnProperty("_id") ){

                res.status(400).json({
                    status: false,
                    msg:C.BAD_REQUEST
                });
            }else {

                // it will check groups either collection ids are valid or not
                groups.checkGroups(req.body.collectionIds)
                    .then((res)=>{
                        next();
                    })
                    .catch((err)=>{
                        console.log(err)
                        res.json(err);
                    })
            }
        }
        if(req.method == "DELETE" && req.originalUrl.includes("group")){

            if(!req.body.hasOwnProperty("_id") ){

                res.status(400).json({
                    status: false,
                    msg:C.BAD_REQUEST
                });
            }
            next()
        }

        if(req.method == "POST" && req.originalUrl.includes("collection")){
            if(!req.body.hasOwnProperty("name")){

                res.status(400).json({
                    status: false,
                    msg:C.BAD_REQUEST
                });
            }
            next()
        }
        if(req.method == "PUT" && req.originalUrl.includes("collection")){
            if(!req.body.hasOwnProperty("name") && !req.body.hasOwnProperty("_id")){

                res.status(400).json({
                    status: false,
                    msg:C.BAD_REQUEST
                });
            }
            next()
        }
        if(req.method == "DELETE" && req.originalUrl.includes("collection")){
            if(!req.body.hasOwnProperty("_id")){

                res.status(400).json({
                    status: false,
                    msg:C.BAD_REQUEST
                });
            }
            next()
        }
        if(req.method == "POST" && req.originalUrl.includes("item")){
            if(!req.body.hasOwnProperty("name")){

                res.status(400).json({
                    status: false,
                    msg:C.BAD_REQUEST
                });
            } else {
                // it will check items either collection ids are valid or not
                if(req.body.hasOwnProperty("parentId")){
                    if(req.body.parentId  != "" && req.body.parentId  != undefined && req.body.parentId  != null){
                        items.checkItems(req.body.parentId)
                            .then((res)=>{
                                next();
                            })
                            .catch((err)=>{
                                res.json(err);
                            })
                    }else next();
                }else next();

            }
        }
        if(req.method == "PUT" && req.originalUrl.includes("item")){
            if(!req.body.hasOwnProperty("name") && !req.body.hasOwnProperty("_id")){

                res.status(400).json({
                    status: false,
                    msg:C.BAD_REQUEST
                });
            }else {
                // it will check items either collection ids are valid or not
                if(req.body.hasOwnProperty("parentId")){
                    if(req.body.parentId  != "" && req.body.parentId  != undefined && req.body.parentId  != null){
                        items.checkItems(req.body.parentId)
                            .then((res)=>{
                                next();
                            })
                            .catch((err)=>{
                                res.json(err);
                            })
                    }else next();
                }else next();

            }
        }
        if(req.method == "DELETE" && req.originalUrl.includes("item")){
            if(!req.body.hasOwnProperty("_id")){

                res.status(400).json({
                    status: false,
                    msg:C.BAD_REQUEST
                });
            }
            next()
        }
        if(req.method == "GET" && req.originalUrl.includes("collection"))
            next()
        if(req.method == "GET" && req.originalUrl.includes("user"))
            next()
        if(req.method == "GET" && req.originalUrl.includes("group"))
            next()
        if(req.method == "GET" && req.originalUrl.includes("item"))
            next()

    }

}


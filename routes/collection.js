/*
##################################################################
-- Name              : collection.js
-- Description       :
-- Creation Date     :
-- Author            : Mustafa
-- Reviewer          :
##################################################################
*/

"use strict";

module.exports = (app, lib) => {

    var router = app.Router();
    var collection = lib.collection;
    let C = require("../constants/constants");

    router.get(C.GET, async (req, res) => {
        try{
            let collections = await collection.getCollections();
            res.json({
                status:200,
                results:collections
            })
        }catch(err){
            console.log(err)
        }

    });

    router.post(C.CREATE, (req, res) => {
        try{
            collection.createCollection(req.body)
                .then((resp)=>{
                    process.logger.info("collection create failed");
                    res.json({
                        status:201,
                        results:resp
                    })
                })
                .catch((err)=>{
                    process.logger.info("collection create failed");
                    res.json({
                        status:500,
                        err:err
                    })
                })
        }catch(err){
            console.log(err)
        }

    });

    router.put(C.EDIT, (req, res) => {
        try{
            collection.editCollection(req.body)
                .then((resp)=>{
                    process.logger.info("Collection edit succeeded");
                    res.json({
                        status:204,
                        results:resp
                    })
                })
                .catch((err)=>{
                    process.logger.info("Collection edit failed");
                    res.json({
                        status:500,
                        err:err
                    })
                })
        }catch(err){
            console.log(err)
        }

    });

    router.delete(C.DELETE, (req, res) => {
        try{

            collection.deleteCollection(req.body)
                .then((resp)=>{
                    res.json(resp)
                    process.logger.info("collection delete succeeded");
                })
                .catch((err)=>{
                    process.logger.info("collection delete failed");
                    res.json({
                        status:501,
                        err:err
                    })
                })


        }catch(err){
            console.log(err)
        }

    });

    return router;
};
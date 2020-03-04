/*
##################################################################
-- Name              : item.js
-- Description       :
-- Creation Date     :
-- Author            : Mustafa
##################################################################
*/

"use strict";

module.exports = (app, lib) => {
    var router = app.Router();
    var item = lib.item;
    let C = require("../constants/constants");

    router.get(C.GET, async (req, res) => {

        try{
            let items = await item.getItems();
            res.json({
                status:200,
                results:items
            })
        }catch(err){
            console.log(err)
        }

    });

    router.post(C.CREATE, (req, res) => {

        try{
            item.createItem(req.body)
                .then((resp)=>{
                    process.logger.info("item create failed");
                    res.json({
                        status:201,
                        results:resp
                    })
                })
                .catch((err)=>{
                    process.logger.info("item create failed");
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
            item.editItem(req.body)
                .then((resp)=>{
                    process.logger.info("item edit succeeded");
                    res.json({
                        status:204,
                        results:resp
                    })
                })
                .catch((err)=>{
                    process.logger.info("item edit failed");
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
            item.deleteItem(req.body)
                .then((resp)=>{
                    res.json(resp)
                    process.logger.info("item delete succeeded");
                })
                .catch((err)=>{
                    process.logger.info("item delete failed");
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
/*
##################################################################
-- Name              :
-- Description       :
-- Creation Date     :
-- Author            :
-- Reviewer          :
##################################################################
*/

"use strict";

module.exports = (app, lib) => {

    var router = app.Router();
    var group = lib.group;
    let C = require("../constants/constants");

    router.get(C.GET, async (req, res) => {
        try{
            let groups = await group.getGroups();
            res.json({
                status:200,
                results:groups
            })
        }catch(err){
            console.log(err);
        }
    });

    router.post(C.CREATE, (req, res) => {
        try{
            group.createGroup(req.body)
                .then((resp)=>{
                    process.logger.info("group create failed");
                    res.json({
                        status:201,
                        results:resp
                    })
                })
                .catch((err)=>{
                    process.logger.info("group create failed");

                    res.json({
                        err:err
                    })
                })
        }catch(err){
            console.log(err);
        }

    });

    router.put(C.EDIT, (req, res) => {
        try{
            group.editGroup(req.body)
                .then((resp)=>{
                    process.logger.info("group edit succeeded");
                    res.json({
                        status:204,
                        results:resp
                    })
                })
                .catch((err)=>{
                    process.logger.info("group edit failed");
                    res.json({
                        err:err
                    })
                })
        }catch(err){
            console.log(err);
        }

    });

    router.delete(C.DELETE, (req, res) => {
        try{
            group.deleteGroup(req.body)
                .then((resp)=>{
                    res.json(resp)
                    process.logger.info("group delete succeeded");
                })
                .catch((err)=>{
                    process.logger.info("group delete failed");
                    res.json({
                        status:501,
                        err:err
                    })
                })

        }catch(err){
            console.log(err);
        }

    });

    return router;
};
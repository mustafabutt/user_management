/*
##################################################################
-- Name              : user.js
-- Description       :
-- Creation Date     :
-- Author            : Mustafa
-- Reviewer          :
##################################################################
*/

"use strict";

module.exports = (app, lib) => {
    var router = app.Router();
    var user = lib.user;
    let C = require("../constants/constants");

    router.get(C.GET, async (req, res) => {
        try{
            process.logger.info("user info");
            let users = await user.getUsers();
            res.json(users);
        }catch(err){
            console.log(err)
        }


    });

    router.post(C.CREATE, (req, res) => {
        try{
            user.createUser(req.body)
                .then((resp)=>{
                    process.logger.info("user create succeeded");
                    res.json({
                        status:201,
                        results:resp
                    })
                })
                .catch((err)=>{
                    process.logger.info("user create failed");
                    res.json({
                        err:err
                    })
                })

        }catch(err){
            console.log(err)
        }

    });

    router.put(C.EDIT, (req, res) => {
        try{

            user.editUser(req.body)
                .then((resp)=>{
                    process.logger.info("user edit succeeded");
                    res.json({
                        status:204,
                        results:resp
                    })
                })
                .catch((err)=>{
                    process.logger.info("user edit failed");
                    res.json({
                        err:err
                    })
                })


        }catch(err){
            console.log(err)
        }


    });

    router.delete(C.DELETE, (req, res) => {
        try{
            user.deleteUser(req.body)
                .then((resp)=>{
                    res.json(resp)
                    process.logger.info("user delete succeeded");
                })
                .catch((err)=>{
                    process.logger.info("user delete failed");
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
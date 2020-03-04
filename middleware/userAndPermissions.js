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
    let utils = require("../utilities/utils")();

// lets assume we have users collections and we will check the logged in user roles and permissions based on token coming in the headers
    if(req){

        let firstUser = {
            email:C.FIRST_EMAIL,
            roles:C.FIRST_ROLES
        }
        let secondUer = {
            email:C.SECOND_EMAIL,
            roles:C.SECOND_ROLES
        }
        let thirdUser = {
            email:C.THIRD_EMAIL,
            roles:C.THIRD_ROLES
        }
        if(req.headers.hasOwnProperty(C.TOKEN)){
            //lets assume we get the user details based on token
            if(req.headers.token == C.FIRST_TOKEN){
                req.user = firstUser;

                // check the permissions
                let user = utils.checkPermissions(req.user.roles,req.headers.currentgroup )
                console.log(user)
                if(user.toLowerCase() == C.MANAGER.toLowerCase() || user.toLowerCase() == C.GLOBAL_MANAGER.toLowerCase() || req.method == C.GET_)
                    next();
                else res.status(401).json({
                    msg:C.UNAUTHORIZED
                });
            }

            if(req.headers.token == C.SECOND_TOKEN){
                req.user = secondUer;
                // check the permissions
                let user = utils.checkPermissions(req.user.roles,req.headers.currentgroup )
                console.log(user)
                if(user.toLowerCase() == C.MANAGER.toLowerCase()|| user.toLowerCase() == C.GLOBAL_MANAGER.toLowerCase() || req.method == C.GET_)
                    next();
                else res.status(401).json({
                    msg:C.UNAUTHORIZED
                });
            }

            if(req.headers.token == C.THIRD_TOKEN){
                req.user = thirdUser;
                // check the permissions
                let user = utils.checkPermissions(req.user.roles,req.headers.currentgroup )
                if(user.toLowerCase() == C.MANAGER.toLowerCase() || user.toLowerCase() == C.GLOBAL_MANAGER.toLowerCase() || req.method == C.GET_)
                    next();
                else res.status(401).json({
                    msg:C.UNAUTHORIZED
                });
            }

        }else res.status(401).json({
            msg:C.UNAUTHORIZED
        });

    }

}


/*
##################################################################
-- Name              :roles.js
-- Creation Date     :
-- Author            :Mustafa
##################################################################
*/

"use strict";

module.exports =  () => {

    var mongoose = require('mongoose');
    let rolesModal = require("../modals/roles")(mongoose);
    let asyncLoop = require('node-async-loop');
    let C = require("../constants/constants");
    let utils = require("../utilities/utils")();
    let _ = require("underscore");

    return {
        checkRoles:  (body,method) => {
            try{
                return new Promise((resolve,reject)=>{

                    if(body.hasOwnProperty("roles")){
                        body.roles.forEach((role,i)=>{
                            if(!_.contains([C.MANAGER,C.GLOBAL_MANAGER,C.REGULAR],role.role.toLowerCase()))
                            {
                                reject({msg:C.BAD_REQUEST,status:400})
                            }
                            if(role.role.toLowerCase() == C.GLOBAL_MANAGER && body.roles.length>1)
                            {
                                reject({msg:C.BAD_REQUEST,status:400})
                            }
                            if(method != "PUT" && (role.role.toLowerCase() == C.GLOBAL_MANAGER && role.groupId != C.EMPTY))
                            {
                                reject({msg:C.BAD_REQUEST,status:400})
                            }
                            if((role.role.toLowerCase() == C.MANAGER && role.groupId == null) || (role.role == C.MANAGER.toLowerCase() && role.groupId ==C.EMPTY))
                            {
                                reject({msg:C.BAD_REQUEST,status:400})
                            }
                            if((role.role.toLowerCase() == C.REGULAR && role.groupId == null) || (role.role == C.REGULAR.toLowerCase() && role.groupId == C.EMPTY))
                            {
                                reject({msg:C.BAD_REQUEST,status:400})
                            }
                            if((role.role == C.EMPTY && role.groupId != C.NULL) || (role.role == C.UNDEFINED && role.groupId != C.EMPTY))
                            {
                                reject({msg:C.BAD_REQUEST,status:400})
                            }
                            if(i == body.roles.length - 1){

                                //checking groups coming in the req.body are valid
                                utils.fetchSpecificGroups(body.roles)
                                    .then((resp)=>{
                                        resolve(resp)
                                    })
                                    .catch((err)=>{
                                        reject({msg:C.BAD_REQUEST,status:400})
                                    })

                            }

                        })
                    }
                })
            }catch(err){

            }
        },
        fetchRoles:  () => {
            return new Promise((resolve,reject)=>{
                rolesModal.find((err,res)=>{
                    if(err)
                        reject(err)
                    else resolve(res)
                })
            })

        },

        deleteRoles : (roles)=>{
            try{
                return new Promise((resolve,reject)=>{
                    asyncLoop(roles, async function (item, next)
                    {
                        rolesModal.findOneAndRemove({_id:item._id},(err,doc)=>{
                            if(!err)
                                next();
                        })

                    }, (err,res) => {
                        if(err){
                            reject({
                                status:501,
                                msg:"error while deleting roles"
                            })
                        }
                        resolve({status:204,msg:"roles deleted"})

                    })

                });

            }catch(err){
                process.logger.warn('error while creating roles');
            }

        },
        editRoles: (body)=>{
            try{

                let tempArray = [];
                return new Promise((resolve,reject)=>{
                asyncLoop(body.roles, async function (item, next)
                {
                    if(item.role.toLowerCase() == C.GLOBAL_MANAGER)
                        item.groupId = "";
                    rolesModal.findOneAndUpdate({_id:item._id},{$set: item},{
                        new:true
                    },(err,doc)=>{
                        if(!err){
                            tempArray.push(doc);
                            next();
                        }
                    })

                }, (err,res) => {
                    if(err){
                        reject({
                        status:501,
                        msg:"error while updating roles"
                        })
                    }
                    resolve({status:204,roles:tempArray})

                    })

                });

            }catch(err){
                process.logger.warn('error while creating roles');
            }

        },
        fetchSpecificRoles:  (roles) => {
            try{
                return new Promise((resolve,reject)=>{
                    rolesModal.find({
                        '_id': { $in: roles}
                    }, (err, docs)=>{
                        if(err)
                            reject(err)
                        resolve(docs)
                    });
                })
            }catch(err){
                console.log(err)
            }

        },

        createRoles: async (body)=>{
            try{
                return new Promise((resolve,reject)=>{
                    console.log(body)
                    rolesModal.insertMany(body.roles)
                        .then(function(mongooseDocuments) {
                            resolve({"roles":_.pluck(mongooseDocuments,"_id")})
                        })
                        .catch(function(err) {
                            console.log(err)
                        });
                })

            }catch(err){
                process.logger.warn('error while creating roles');
            }

        }
    }

}



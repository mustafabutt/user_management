/*
##################################################################
-- Name              : user.js
-- Creation Date     :
-- Author            : Mustafa
##################################################################
*/

"use strict";

module.exports = (modals) => {

    let rolesLayer = require("../middleware/roles")();
    const userModel = modals.user;
    var async = require('async');

    return {

        getUsers : async () => {
            return new Promise((resolve,reject)=>{
                userModel.find((err,res)=>{
                    if(err)
                         reject(err)
                    else resolve(res)
                })
            })

        },
        createUser : async (body) => {

            return new Promise( (resolve,reject)=>{

                async.waterfall([

                    function(done)
                    {
                        rolesLayer.createRoles(body)
                            .then((res)=>{
                                done(null,res.roles)
                            })
                            .catch((err)=>{})

                    },
                    function (roles,done)
                    {

                        let tempUser = {"email":body.email,"roles":roles}
                        const user = new userModel(tempUser)
                        user.save((err,res)=>{
                            if(err)
                                console.log(err)
                            else done(null,res)
                        })

                    },
                    function (data,done)
                    {

                        rolesLayer.fetchSpecificRoles(data.roles)
                            .then((res)=>{
                                data.roles = res
                                resolve(data);
                            })
                    }
                    ],
                    function(errInn,resOuter)
                    {
                        if(errInn)
                            reject(errInn)
                        else
                            resolve(resOuter)

                    }
                    );
            })

        },
        editUser : (body) => {

            return new Promise( (resolve,reject)=>{

                async.waterfall([

                        function(done)
                        {

                            rolesLayer.editRoles(body)
                                .then((res)=>{
                                    done(null,res.roles)
                                })
                                .catch((err)=>{
                                    console.log(err)
                                })

                        },
                        function (roles,done)
                        {
                            let tempUser = {"email":body.email,"roles":roles}

                            userModel.findOneAndUpdate({"_id":body._id},{$set: tempUser},{new:true},(err,res)=>{
                                if(err){
                                    reject(err)
                                }
                                else {
                                    resolve(res)
                                }
                            })

                        }
                    ],
                    function(errInn,resOuter)
                    {
                        if(errInn)
                            reject(errInn)
                        else
                            resolve(resOuter)
                    }
                );
            })


        },
        deleteUser : (body) => {

            return new Promise((resolve,reject)=>{

                async.waterfall([

                        function(done)
                        {
                            rolesLayer.deleteRoles(body.roles)
                                .then((res)=>{
                                    done(null)
                                })
                                .catch((err)=>{
                                    console.log(err)
                                })

                        },
                        function (done)
                        {
                            userModel.findOneAndDelete({_id:body._id},(err,res)=>{
                                if(err)
                                    reject(err)
                                else {
                                    resolve({
                                        status:204,
                                        res:res
                                    })
                                }
                            })

                        }
                    ],
                    function(errInn,resOuter)
                    {
                        if(errInn)
                            reject(errInn)
                        else
                            resolve(resOuter)

                    }
                );
            })

        },

    }
};

/*
##################################################################
-- Name              : group.js
-- Creation Date     :
-- Author            :Mustafa
##################################################################
*/

"use strict";

module.exports = (modals) => {

    let utils = require("../utilities/utils")();
    let C = require("../constants/constants");
    const groupModel = modals.group;

    return {

        getGroups : async () => {
            return new Promise((resolve,reject)=>{
                groupModel.find((err,res)=>{
                    if(err)
                        reject(err)
                    else resolve(res)
                })
            })

        },
        createGroup :  (body) => {
            return new Promise( async (resolve,reject)=>{
                //this function will make sure that there is no duplications of collections in a single group
                let tempArray = await utils.checkUniqueValues(body.collectionIds);

                if(tempArray.length == body.collectionIds.length){
                    // this function will make sure that no collection is assign to more than one group
                    utils.checkCollectionsInGroups(body.collectionIds)
                        .then((res)=>{
                            new groupModel(body).save((err,resp)=>{
                                if(err)
                                    reject({msg:C.INTERNAL_ERROR,status:501})
                                else  resolve(resp)
                            });

                        })
                        .catch((err)=>{
                            reject({msg:C.BAD_REQUEST,status:400})
                        })

                }
                else reject({msg:C.BAD_REQUEST,status:400})
            })


        },

        editGroup : (body) => {

            return new Promise( async (resolve,reject)=>{
                let tempArray = await utils.checkUniqueValues(body.collectionIds);

                //this function will make sure that there is no duplications of collections in a single group
                if(tempArray.length != body.collectionIds.length)
                    reject( {msg:C.BAD_REQUEST,status:400})

                utils.checkCollectionsInGroups(body.collectionIds)
                    .then((res)=>{
                        groupModel.findOneAndUpdate({"_id":body._id},{$set: body},{new:true},(err,res)=>{
                            if(err){
                                reject(err)
                            }
                            else {
                                resolve(res)
                            }
                    })
                    .catch((err)=>{
                        reject({msg:C.BAD_REQUEST,status:400})
                    })
                })
                .catch((err)=>{
                    reject({msg:C.BAD_REQUEST,status:400})
                })
            })


        },
        deleteGroup : (body) => {
            return new Promise((resolve,reject)=>{
                groupModel.findOneAndDelete({_id:body._id},(err,res)=>{
                    if(err){
                        reject(err)
                    }
                    else {
                        resolve({
                            status:204,
                            msg:C.DELETED,
                            res:res
                        })
                    }
                })
            })

        },

    }
};

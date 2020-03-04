/*
##################################################################
-- Name              : collection.js
-- Creation Date     :
-- Author            :Mustafa
##################################################################
*/

"use strict";

module.exports = (modals) => {

    const collectionModel = modals.collection;

    return {

        getCollections : async () => {

            return new Promise((resolve,reject)=>{
                collectionModel.find((err,res)=>{
                    if(err)
                        reject(err)
                    else
                        resolve(res)
                })
            })

        },
        createCollection : async (body) => {

            const newCollection = new collectionModel(body)
            return await newCollection.save();

        },

        editCollection : (body) => {

            return new Promise( (resolve,reject)=>{
                collectionModel.findOneAndUpdate({"_id":body._id},{$set: body},{new:true},(err,res)=>{
                    if(err){
                        reject(err)
                    }
                    else {
                        resolve(res)
                    }
                })
            })


        },
        deleteCollection : (body) => {
            return new Promise((resolve,reject)=>{
                collectionModel.findOneAndDelete({_id:body._id},(err,res)=>{
                    if(err){
                        reject(err)
                    }
                    else {
                        resolve({
                            status:204,
                            res:res
                        })
                    }
                })
            })

        },

    }
};

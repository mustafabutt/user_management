/*
##################################################################
-- Name              : item.js
-- Creation Date     :
-- Author            :Mustafa
##################################################################
*/

"use strict";

module.exports = (modals) => {
    const itemModel = modals.item;

    return {

        getItems : async () => {

            return new Promise((resolve,reject)=>{
                itemModel.find((err,res)=>{
                    if(err)
                        reject(err)
                    else
                        resolve(res)
                })
            })

        },
        createItem : async (body) => {

            const newItem = new itemModel(body)
            return await newItem.save();

        },

        editItem : (body) => {

            return new Promise( (resolve,reject)=>{
                itemModel.findOneAndUpdate({"_id":body._id},{$set: body},{new:true},(err,res)=>{
                    if(err){
                        reject(err)
                    }
                    else {
                        resolve(res)
                    }
                })
            })


        },
        deleteItem : (body) => {
            return new Promise((resolve,reject)=>{
                itemModel.findOneAndDelete({_id:body._id},(err,res)=>{
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

/*
##################################################################
-- Name              :groupValidator.js
-- Creation Date     :
-- Author            :Mustafa
##################################################################
*/

"use strict";

module.exports =  () => {

    var mongoose = require('mongoose');
    let collectionModal = require("../modals/collection")(mongoose);
    let C = require("../constants/constants")
    let _ = require("underscore");

    return {
        checkGroups: async (collectionIds) => {
            try{
                return new Promise((resolve,reject)=>{
                    let tempObj = {_id:""};
                    let tempArray = [];
                    collectionIds.forEach((item)=>{
                        tempObj = {_id:""};
                        tempObj._id=item;
                        tempArray.push(tempObj);

                    });

                    collectionModal.find({
                        '_id': { $in: tempArray}
                    }, (err, docs)=>{
                        if(err)
                            reject({msg:C.BAD_REQUEST,status:400})
                        resolve(docs)
                    });

                })
            }
            catch(err){

            }
        }
    }

}


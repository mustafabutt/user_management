/*
##################################################################
-- Name              :itemValidator.js
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
        checkItems: async (collectionIds) => {
            try{
                return new Promise((resolve,reject)=>{

                    collectionModal.find({
                        '_id': collectionIds
                    }, (err, docs)=>{
                        if(err)
                            reject({msg:C.BAD_REQUEST,status:400})
                        resolve(docs)
                    });

                })
            }
            catch(err){
                console.log(err)
            }

        }
    }

}


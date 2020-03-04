/*
##################################################################
-- Name              :utils.js
-- Creation Date     :
-- Author            :Mustafa
##################################################################
*/

"use strict";

module.exports =  () => {

    const C = require("../constants/constants");
    let _ = require("underscore");
    let asyncLoop = require('node-async-loop');
    let groupModal = require("../modals/group")(require("mongoose"));

    return {
        checkUniqueValues :  async (values) => {
            return await _.uniq(values);
        },
        checkPermissions : (values,currentGroup) =>{

            let tempRole = "";
            values.forEach((role)=>{
                if(role.groupId == null)
                    tempRole = C.GLOBAL_MANAGER
                else if(role.groupId == currentGroup && role.role == C.MANAGER )
                    tempRole = C.MANAGER
                else if(role.groupId == currentGroup && role.role == C.REGULAR)
                    tempRole = C.REGULAR
            })
            return tempRole;
        },
        checkCollectionsInGroups :  (val) => {
            return new Promise((resolve,reject)=>{
                let bit = true;
                groupModal.find((err,res)=>{
                    if(!err){
                        if(res.length == 0 ){
                            resolve();
                            return
                        }
                    }

                    asyncLoop(res, async function (g, next)
                    {
                        console.log(_.intersection(val,g.collectionIds))
                        if(_.intersection(val,g.collectionIds).length != 0){
                            bit = true;
                            reject()
                        }else next();

                    }, (err) => {
                        if(err)
                        {   reject({
                            status:501,
                        })
                        }else {
                            if(!bit)
                                resolve()
                            else
                                reject()
                        }
                    });
                })
            })
        },
        fetchSpecificGroups : (groups)=> {

            let tempObj = {_id:""};
            let tempArray = [];
            groups.forEach((item)=>{
                tempObj = {_id:""};
                if(typeof item.groupId != undefined || item.groupId != null ){
                    tempObj._id=item.groupId
                }else tempArray.push(tempObj);

            })
            return new Promise((resolve,reject)=>{

                groupModal.find({
                    '_id': { $in: tempArray}
                }, (err, docs)=>{
                    if(err)
                        reject(err)
                    resolve(docs)
                });
            })

        }

    }


}


/*
##################################################################
-- Name              : roles.js
-- Creation Date     :
-- Author            : Mustafa
##################################################################
*/

"use strict";

module.exports = (mongoose) => {

    const Schema = mongoose.Schema;
    const roleSchema = new Schema({
        role : {
            type: String,
            required: true,
        },
        groupId:{
            type:String,
            default:""
        }
    });
    try {
        return mongoose.model('roles', roleSchema);
    } catch (e) {
        return mongoose.model('roles');
    }
};
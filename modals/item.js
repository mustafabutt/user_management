/*
##################################################################
-- Name              : item.js
-- Creation Date     :
-- Author            : Mustafa
##################################################################
*/

"use strict";

module.exports = (mongoose) => {

    const Schema = mongoose.Schema;
    const itemsSchema = new Schema({
        name : {
            type: String,
            unique: true,
            required: true,
        },
        parentId:{
            type: String,
            default:null
        }
    });
    try {
        return mongoose.model('items', itemsSchema);
    } catch (e) {
        return mongoose.model('items');
    }

};
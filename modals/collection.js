/*
##################################################################
-- Name              : collection.js
-- Creation Date     :
-- Author            : Mustafa
##################################################################
*/

"use strict";

module.exports = (mongoose) => {

    const Schema = mongoose.Schema;
    const collectionSchema = new Schema({
        name : {
            type: String,
            unique: true,
            required: true,
        }
    });
    try {
        return mongoose.model('collections', collectionSchema);
    } catch (e) {
        return mongoose.model('collections');
    }

};
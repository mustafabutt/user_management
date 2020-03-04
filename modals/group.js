/*
##################################################################
-- Name              : group.js
-- Creation Date     :
-- Author            : Mustafa
##################################################################
*/

"use strict";

module.exports = (mongoose) => {

    const Schema = mongoose.Schema;
    const groupSchema = new Schema({
        name : {
            type: String,
            unique: true,
            required: true,
        },
        collectionIds:[Object],
    });
    try {
        return mongoose.model('group', groupSchema);
    } catch (e) {
        return mongoose.model('group');
    }

};
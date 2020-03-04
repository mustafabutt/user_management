/*
##################################################################
-- Name              : user.js
-- Creation Date     : 
-- Author            : Mustafa
##################################################################
*/

"use strict";

module.exports = (mongoose) => {

    const Schema = mongoose.Schema;
    const userSchema = new Schema({
        email : {
            type: String,
            unique: true,
            required: true,
        },
        roles:[Object],
    });

    return mongoose.model('users', userSchema);
};
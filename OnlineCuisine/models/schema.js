const mongoose = require('mongoose');
const express = require('express');
var a="";
const schema = new mongoose.Schema({

    name:
    {
        type: String,
        required: true
    },
    lastName:  {
        type: String,
        required: true
    },
    email:  {
        type: String,
        required: true,
        unique:true
    },
    password:  {
        type: String,
        required: true,
    },
    reEnterPassword:  {
        type: String,
        required: true,
    },
});
const form = mongoose.model('form', schema);
module.exports = { form };
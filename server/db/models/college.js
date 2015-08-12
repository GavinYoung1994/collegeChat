'use strict'

var mongoose = require('mongoose');

var School = new mongoose.Schema({
    school: String,
    schoolEmail: String,
    messages: [{
        time: Date,
        content: String
    }]
})

mongoose.model('School', School);
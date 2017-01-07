var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var candidatesSchema = new Schema({

   nameAndSurname: {
    	type : String,
    	default: ''
    },
    userId:{
        type : String,
        default: ''
    },
    goal :{
    	type : String,
    	default: ''
    },
    description: {
        type : String,
        default: ''
    }


});

var memberSchema = new Schema({

   nameAndSurname: {
        type : String,
        default: ''
    },
    userId:{
        type : String,
        default: ''
    }
});

var Meetings = new Schema({

    date: {
        type: Date,
        default: ''
    },
    place: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },
    results: {
        type: String,
        default: ''
    },

    candidates : [candidatesSchema],

    member : [memberSchema]

});


module.exports = mongoose.model('Meetings', Meetings);
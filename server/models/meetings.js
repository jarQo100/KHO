var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var candidatesSchema = new Schema({


    _id: {
    	type: String,
    	default : ''
    },
    nameAndSurname: {
    	type : String,
    	default: ''
    },
    gool :{
    	type : String,
    	default: ''
    },
    description: {
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

    candidates : [candidatesSchema]

});


module.exports = mongoose.model('Meetings', Meetings);
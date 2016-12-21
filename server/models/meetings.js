var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var commentsSchema = new Schema({

	        category: {
	            type : String,
	            default: ''
	        },
	        date : {
	            type: Date,
	            default: Date.now
	        },
	        description:{
	            type : String,
	            default: ''
	        },
	        taskName: {
	            type : String,
	            default : 'general'
	        }


});

var tasksSchema = new Schema({


			category: {
				type: String,
				default : ''
			},
			description: {
				type : String,
				default: ''
			},
			dateEnd :{
				type : Date,
				default: ''
			},


});

const attemptSchema = new Schema({
	 		 quide: {
	     			type: String,
	    			default: ''
	 		},
	 		dateBegin: {
	 			type: Date,
	 			default: ''
	 		},
	 		dateEnd: {
	 			type: Date,
	 			default: ''
	 		},
	 		commandBegin: {
	 			type: String,
	 			default: ''
	 		},
	 		commandEnd: {
	 			type: String,
	 			default: ''
	 		},
	 		results : {
	 			type: String,
	 			default: 'W trakcie realizacji'
	 		},
	 		comments : [ commentsSchema ],

	 		tasks : [tasksSchema]
});


var Todo = new Schema({

	    name: {
        type: String,
        default: ''
    },
    surname: {
        type: String,
        default: ''
    },
    phone: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    },
    address: {
        type: String,
        default: ''
    },
    school: {
        type: String,
        default: ''
    },
    rank: {
        type: String,
        default: ''
    },
    rankInst: {
        type: String,
        default: ''
    },
    birthday: {
        type: String,
        default: ''
    },
    date_add: {
        type: Date,
        default: ''
    },
    team: {
        type: String,
        default: ''
    },
     photo: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        default: ''
    },
    role: {
        type: String,
        default: ''
    },

    attempt : [attemptSchema]

});


module.exports = mongoose.model('Mettings', Mettings);
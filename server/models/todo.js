var mongoose = require('mongoose');

module.exports = mongoose.model('Todo', {
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
     // function: [
     // 	{
     // 		fun_name: {
     //   			type: String,
     //    		default: ''
    	// 	},
    	// 	date_begin: {
     //   			type: Date,
     //    		default: ''
    	// 	},
    	// 	date_end: {
     //   			type: String,
     //    		default: ''
    	// 	}
    	// }
     // ],

});
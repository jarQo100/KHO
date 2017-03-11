var Todo = require('./models/todo');
var Meetings = require('./models/meetings');

var mongoose = require('mongoose');
mongoose.Promise = Promise;

var nodemailer = require('nodemailer');
 var sender = require('./mails/sender.js');

var path = require('path');
var formidable = require('formidable');
var fs = require('fs');
var multer  = require('multer');

function getTodos(res) {
    Todo.find(function (err, todos) {
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        //console.log(todos);
        res.json(todos); // return all todos in JSON format
    });
};

function getMeetings(res) {
    Meetings.find(function (err, todos) {
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        //console.log(todos);
        res.json(todos); // return all todos in JSON format
    });
};

module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/todos', function (req, res) {
        // use mongoose to get all todos in the database
        //console.log("RES      :" + req.body.name;
        getTodos(res);
    });

    // create todo and send back all todos after creation
    app.post('/api/todos', function (req, res) {

        // create a todo, information comes from AJAX request from Angular
        Todo.create({
            name: req.body.name,
            surname: req.body.surname,
            phone: req.body.phone,
            email: req.body.email,
            address: req.body.address,
            school: req.body.school,
            rank: req.body.rank,
            rankInst: req.body.rankInst,
            birthday: req.body.birthday,
            team: req.body.team,
            password: req.body.password,
            role: req.body.role,
            done: false
        }, function (err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            console.log("wstawiono: " + res)
            getTodos(res);
        });

    });

    // delete a todo
    app.delete('/api/todos/:todo_id', function (req, res) {
        Todo.remove({
            _id: req.params.todo_id
        }, function (err, todo) {
            if (err)
                res.send(err);

            getTodos(res);
        });
    });


    app.delete('/api/todos/deleteAttempt/:user_id/:attempt_id', function (req, res) {

        Todo.update(
               {_id: req.params.user_id},
              {$pull : { attempt: {_id : req.params.attempt_id} }
        }, function (err, todo) {

            if (err)
                res.send(err);
        });

    });

        app.delete('/api/todos/deleteMeeting/:meeting_id', function (req, res) {

console.log(req.params.meeting_id);

        Meetings.remove(
               {_id: req.params.meeting_id}
        , function (err, todo) {

            if (err)
                res.send(err);
        });

    });


    app.get('/api/todos/findById/:todo_id', function (req, res) {
        console.log(req.params.todo_id);

        Todo.findById({
            _id: req.params.todo_id
        }, function (err, todo) {
            if (err)
                res.send(err);

            res.json(todo);
        });
    });

    app.get('/api/todos/findByEmail/:todo_email', function (req, res) {
        console.log(req.params.todo_email);

        Todo.findOne({
            email: req.params.todo_email
        }, function (err, todo) {
            if (err)
                res.send(err);

            res.json(todo);
        });
    });

app.get('/api/todos/findByIdAttempt/:todo_id', function (req, res) {
        console.log(req.params.todo_id);

        Todo.find({
            'attempt._id': req.params.todo_id
        }, function (err, todo) {
            if (err)
                res.send(err);

            res.json(todo);
        });
    });


         app.put('/api/todos/updateScout', function (req, res) {

                var query = {'_id': req.body._id};

               Todo.findOneAndUpdate(query, req.body, {upsert:true}, function(err, doc){
                        if (err) return res.send(500, { error: err });
                                return res.send("succesfully saved");
                        });
            });

app.put('/api/todos/updateAttempt', function (req, res) {

console.log(req.body);
var query = {'attempt._id': req.body._id};

Todo.findOne(query, function (err, todo) {
    // Handle any possible database errors

    for(i=0; i < todo.attempt.length; i++){

        if(todo.attempt[i]._id == req.body._id){

            Todo.findOneAndUpdate(
               query,
              { 'attempt.$' : req.body },
                function (err, todo) {

                    if (err)
                        res.send(err);
                });

            console.log("wlazło");
            todo.attempt[i] = null;
        }

    };

    if (err) {
        res.status(500).send(err);
    } else {

     }




});

});

app.get('/api/todos/findTask/:task_id', function (req, res) {

        Todo.findOne(
            {
                'attempt._id' : req.params.task_id
            },
            function (err, todo) {
            if (err)
                res.send(err);

            res.json(todo);
        });

});


//WSTAWIANIE NOWEJ PRÓBY DLA UŻYTKOWNIKA
app.put('/api/todos/addAttempt/:user_id', function (req, res) {

     console.log(req.params.user_id);
     console.log(req.body);

    var query = {_id : req.params.user_id};
    var update = { $pull : { attempt : req.body } };
    var options = {new: true};

Todo.findById(query, function (err, todo) {
    // Handle any possible database errors
    console.log(todo);

    if (err) {
        res.status(500).send(err);
    } else {
        // Update each attribute with any possible attribute that may have been submitted in the body of the request
        // If that attribute isn't in the request body, default back to whatever it was before.
        todo.attempt.push(req.body);

        console.log("+++++++++++++++++++++++++++++++");
        console.log(todo);


        Todo.update(
               {_id: req.params.user_id},
              todo,
        function (err, todo) {

            if (err)
                res.send(err);
        });


        // Save the updated document back to the database
        // todo.save()
        //     .then(todo => responseOk.call(res, todo))
        //     .catch(err => responseFailedValidation.call(res, err.toString()));

    }
});


});


app.post('/api/todos/createComment/:task_id', function (req, res) {
    console.log(req.params.task_id);
    console.log(req.body);


        Todo.update(

               { 'attempt._id' : req.params.task_id },
               { $push : { 'attempt.$.comments' : req.body } },

            {safe: true, upsert: true, new : true

        }, function (err, todo) {
            if (err)
                res.send(err);

        });
    });

app.post('/api/authenticate', function (req, res) {
    console.log(req.body.username);



         Todo.find({
            'email': req.body.username,
            'password' : req.body.password
        }, function (err, todo) {
            if (err)
                res.send(err);


            if(todo.length != 0){
                res.json({success: true});
            }else{
                res.json({success: false});
            }


        });



    });

app.get('/api/todos/checkRole/:user_email', function(req, res){
    console.log(req.params.user_email);
    Todo.findOne(
        {email : req.params.user_email}
        ,function(err, todo){
            console.log(todo.role);
            return res.json({role : todo.role});
    });
});

app.post('/api/todos/createMeeting/', function(req, res){
    Meetings.create({
            date: req.body.date,
            place: req.body.place,
            description: req.body.description,
            done: false
        }, function (err, todo) {
            if (err)
                res.send(err);
        });
});

    app.get('/api/todos/getMeetings', function (req, res) {
        // use mongoose to get all todos in the database
        //console.log("RES      :" + req.body.name;
        getMeetings(res);
    });


    app.put('/api/meeting/adduser', function (req, res) {
        // use mongoose to get all todos in the database
        console.log(req.body);

         var query = { _id : req.body.meetingId};
         var update = { $push : { 'candidates' : req.body } };
         var options = {new: true};

         Meetings.update(

               {_id : req.body.meetingId},
               update,

            {safe: true, upsert: true, new : true

        }, function (err, todo) {

            console.log(todo);

            if (err)
                res.send(err);

        });
  });
         app.put('/api/todos/confirmPresent', function (req, res) {
        // use mongoose to get all todos in the database
        console.log(req.body);

         var query = { _id : req.body.meetingId};
         var update = { $push : { 'member' : req.body } };
         var options = {new: true};

         Meetings.update(

               {_id : req.body.meetingId},
               update,

            {safe: true, upsert: true, new : true

        }, function (err, todo) {

            console.log(todo);

            if (err)
                res.send(err);

        });



    });



app.put('/api/sendEmail', function (req, res) {
         sender.send(req.body);
});

app.put('/api/todos/confirmPresent/sendEmail', function (req, res) {
        sender.confirmPresent(req.body);
});

app.put('/api/todos/confirmPresentReport/sendEmail', function (req, res) {
         sender.confirmPresentReport(req.body);
});

app.put('/api/meeting/adduser/sendEmail', function (req, res) {
         sender.confirmPresent(req.body);
});


var storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            var dir = './uploads/' + req.params.username + '/';

            if (!fs.existsSync(dir)){
                fs.mkdirSync(dir);
            }
            cb(null, dir)
        },
        filename: function (req, file, cb) {
            console.log(file);
            var datetimestamp = Date.now();
            cb(null,  datetimestamp + '-' + file.originalname)
        }
    });

var upload = multer({ //multer settings
                    storage: storage
                }).single('file');

app.post('/api/sendFiles/:username', function(req,res){
    console.log(req.params.username);

        upload(req,res,function(err){
            if(err){
                 res.json({error_code:1,err_desc:err});
                 return;
            }
             res.json({error_code:0,err_desc:null});
        });

});

app.post('/api/readFiles', function(req,res){
    console.log(req.body.username);
    var dir = './uploads/' + req.body.username + '/';

    fs.readdir(dir, (err, files) => {
      files.forEach(file => {
        console.log(file);
      });
      res.json(files);
    })

});







    //application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/dist/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};

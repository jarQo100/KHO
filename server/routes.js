var Todo = require('./models/todo');
var mongoose = require('mongoose');
mongoose.Promise = Promise;

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


    // Todo.update(query, update, options, function(err, superhero){

    //     console.log(superhero)

    //   });







       //Todo.update(query);


// var query = Todo.findOne({ _id : req.params.user_id});
// console.log(query);

// query.then(function(user){

//     user.attempt.push({attempt : req.body});
//     user.save();

// });

});


app.post('/api/todos/createComment/:task_id', function (req, res) {
    console.log(req.params.task_id);
    console.log(req.body.category);


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




    //application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/app/dist/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};

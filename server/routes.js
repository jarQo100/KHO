var Todo = require('./models/todo');

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
console.log( "create");
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
        console.log(    "delete");
        Todo.remove({
            _id: req.params.todo_id
        }, function (err, todo) {
            if (err)
                res.send(err);

            getTodos(res);
        });
    });

    // delete a todo
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


         app.put('/api/todos/updateScout', function (req, res) {

                    var query = {'_id': req.body._id};

               Todo.findOneAndUpdate(query, req.body, {upsert:true}, function(err, doc){
                        if (err) return res.send(500, { error: err });
                                return res.send("succesfully saved");
                        });
                });




    //application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/app/dist/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};

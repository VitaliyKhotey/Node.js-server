var express = require("express"),
    http = require("http"),
    app = express(),
    mongo = require("mongodb");
    var bodyParser = require('body-parser');

    var host = 'localhost';
    var port = mongo.Connection.DEFAULT_PORT;
    var db = new mongo.Db('ToDo', new mongo.Server(host, port, {}), {safe:false});

app.use(express.static(__dirname + "/client"));
app.use(bodyParser.urlencoded({ extended: false }));
http.createServer(app).listen(3000);
/*mongo.connect("mongodb://localhost:27017/ToDo");

var toDoSchema = mongo.Schema({
    description: String,
    tags: [String]
});

var ToDo = mongo.model("ToDo", toDoSchema);

app.get("/todos.json", function(req, res){
    toDo.find({}, function(err, toDos){
        res.json(toDos);
    });
});*/
app.post("/todos", function (req, res) {    
    console.log(req.body.tags);
    /*
    var newToDo = new ToDo({"description": res.body.description, "tags": res.body.tags});

    newToDo.save( function(err, result){
        if(err !== null) {
            console.log(err);
            res.send("Error!");
        } else {
            ToDo.find({}, function(err, result){
                if(err !== null) {
                    res.send("Error");
                }
                res.json(result);
            });
        }
    });

    toDos.push(newToDo);
*/
     db.open(function(err, db) {
        var collection = db.collection("todo");
        collection.insert({description:req.body.description, tags:req.body.tags});
        db.close();
    }); 

  /*  collection.findOne(function(err, item) {
        console.log(item);
        db.close();
    })
*/
    res.json({"message":"You posted to the server!"});
});


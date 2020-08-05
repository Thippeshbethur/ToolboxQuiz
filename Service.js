var express = require('express');
var app = express();
var fs = require("fs");
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var database;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
var randomize = require('randomatic');


MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  database = db;
  var dbo = db.db("ToolBoxQuiz");
  dbo.createCollection("QuizQuestion", function (err, res) {
    if (err) throw err;
    console.log("Collection created!");
  });
});
app.post('/updatejsondata', function (req, res) {

  var dbo = database.db("ToolBoxQuiz");
  
  var data = JSON.stringify(req.body).trim();
  var quiztitle = JSON.parse(data)['json']['pages'][0]['title'];
  var quiztitledesc = JSON.parse(data)['json']['pages'][0]['description'];
  var myquery = {'id':JSON.parse(data)['quizid']};
  console.log(JSON.parse(data)['json']);
  var newvalues = { $set:{"quizname":quiztitle,"quiztitledesc":quiztitledesc,"json":JSON.stringify(JSON.parse(data)['json'])}};
  dbo.collection("QuizQuestion").updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log("1 document updated");
  });
  fs.writeFile(__dirname + "/src/assets/" + "survey.json", JSON.stringify(JSON.parse(data)['json']), function (err) {
    if (err) throw err;
  });
})

app.post('/putjsondata', function (req, res) {
  fs.writeFile(__dirname + "/src/assets/" + "survey.json", JSON.stringify(req.body), function (err) {
    if (err) throw err;
  });
  var dbo = database.db("ToolBoxQuiz");
  var data = JSON.stringify(req.body).trim();
  let coll = dbo.collection('QuizQuestion');
  var totalrows = 1;
  totalrows = randomize('0', 7);
  var jsonparseddata = JSON.parse(data);
  var quiztitle = jsonparseddata['pages'][0]['title'];
  var quiztitledesc = jsonparseddata['pages'][0]['description'];

  var myobj = {
    id: totalrows,
    json: data,
    quizname: quiztitle,
    quiztitledesc: quiztitledesc,
    ispublished: 0
  };
  dbo.collection("QuizQuestion").insertOne(myobj, function (err) {
    if (err) throw err;
    res.send({
      status: "S001"
    });
    console.log("1 document inserted");
  });
});
app.get('/getjsondata', function (req, res) {
  var dbo = database.db("ToolBoxQuiz");
  var collection = dbo.collection('QuizQuestion');
  return collection.find({}).toArray(function (err, result) {
    res.send(result);
  });
});
app.post('/getstatusbyid', function (req, res) {
  var dbo = database.db("ToolBoxQuiz");
  var collection = dbo.collection('QuizQuestion');

  var objv = JSON.parse(JSON.stringify(req.body));
  return collection.find(objv[0]).toArray(function (err, result) {
    if (result.length > 0)
      res.send({
        status: "S001"
      });
    else
      res.send({
        status: "S002"
      });
  });
});
app.post('/getjsondataby', function (req, res) {
  var dbo = database.db("ToolBoxQuiz");
  var collection = dbo.collection('QuizQuestion');

  var objv = JSON.parse(JSON.stringify(req.body));
  return collection.find(objv[0]).toArray(function (err, result) {
    console.log(result)
    fs.writeFile(__dirname + "/src/assets/" + "survey.json", result[0]['json'], function (err) {
      if (err) throw err;
    });
    res.send(result);

  });
});
app.post('/deletejsondata', function (req, res) {
  var dbo = database.db("ToolBoxQuiz");
  var objv = JSON.parse(JSON.stringify(req.body));
  var myquery = objv[0];
  dbo.collection("QuizQuestion").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    res.send({
      status: "S001"
    });
    console.log("1 document deleted");
  });
});
app.post('/publishquiz', function (req, res) {
  var dbo = database.db("ToolBoxQuiz");
  var objv = JSON.parse(JSON.stringify(req.body));
  var myquery = objv[0];
  var newvalues = {
    $set: {
      "ispublished": 1
    }
  };
  dbo.collection("QuizQuestion").updateOne(myquery, newvalues, function (err, obj) {
    if (err) throw err;
    res.send({
      'status': "S001"
    });
    console.log("1 document Updated");
  });
});
app.post('/putstudentdata', function (req, res) {
  var dbo = database.db("ToolBoxQuiz");
  var data = JSON.stringify(req.body).trim();

  totalrows = randomize('0', 7);
  var jsonparseddata = JSON.parse(data);
  var Quizid = jsonparseddata[0]['Quizid'];
  var studentname = jsonparseddata[0]['studentname'].toLowerCase();

  var myobj = {
    id: totalrows,
    Quizid: Quizid,
    studentname: studentname,
    issubmitted: 0
  };
  dbo.collection("Studentdata").find({'studentname': studentname,'Quizid':Quizid},{$exists: true}
  ).toArray(function (err, doc) //find if a value exists
    {
      console.log(doc)
      if (doc!='') //if it does
      {   
        res.send({
          status: "S002"
        });     
        
      } else  // if it does not 
      {
        dbo.collection("Studentdata").insertOne(myobj, function (err) {
          if (err) throw err;
          res.send({
            status: "S001"
          });
          console.log("1 document inserted");
        }); // print out what it sends back
      }
    });
  
});
app.get('/index', function (req, res) {
  fs.readFile(__dirname + "/" + "index.html", 'utf8', function (err, data) {
    console.log(err);
    res.end(data);
  });
});
var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)
})

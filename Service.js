var express = require('express');
var autoIncrement = require("mongodb-autoincrement");
var app = express();
var fs = require("fs");
const cors = require('cors');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/ToolBoxQuiz";
var database;

var bodyParser = require('body-parser');
app.use(cors());
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: true
}));
var randomize = require('randomatic');
MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  database = db;
  var dbo = db.db("ToolBoxQuiz");
});
app.post('/updatejsondata', function (req, resp) {
  var currtim=new Date().toLocaleString().toString();
  var curr=new Date(currtim).toLocaleString();
  var dbo = database.db("ToolBoxQuiz");
  var data = JSON.stringify(req.body).trim();
  var quiztitle = JSON.parse(data)['json']['pages'][0]['title'];
  var quiztitledesc = JSON.parse(data)['json']['pages'][0]['description'];
  var myquery = {
    'id': JSON.parse(data)['quizid']
  };
  console.log(JSON.parse(data)['json']);
  var newvalues = {
    $set: {
      "quizname": quiztitle,
      "quiztitledesc": quiztitledesc,
      "json": JSON.stringify(JSON.parse(data)['json']),
      "createddate":curr
    }
  };
  dbo.collection("QuizQuestion").updateOne(myquery, newvalues, function (err, res) {
    if (err) throw err;
    resp.send({
      status: "S001"
    });
    console.log("1 document updated");
  });
})
app.post('/updatestudentsubmitteddata', function (req, resp) {
  var dbo = database.db("ToolBoxQuiz");
  var data = JSON.stringify(req.body).trim();
  var submittedjson=JSON.parse(data)['submittedans'];
  var score=JSON.parse(data)['Score'];
  var myquery = {
    'id': JSON.parse(data)['quizid']
  };
  console.log(JSON.parse(data));
  var newvalues = {
    $set: {
      "Submitteddata":submittedjson ,
      "issubmitted": 1, 
      "Score":score,
    }
  };
  dbo.collection("Studentdata").updateOne(myquery, newvalues, function (err, res) {
    if (err) throw err;
    resp.send({
      status: "S001"
    });
    console.log("1 document updated");
  });
})


app.post('/putjsondata', function (req, res) {
  var currtim=new Date().toLocaleString().toString();
  var curr=new Date(currtim).toLocaleString();
  var dbo = database.db("ToolBoxQuiz");
  var data = JSON.stringify(req.body).trim();
  let coll = dbo.collection('QuizQuestion');
  var totalrows = 1;
  totalrows = randomize('0', 7);
  var jsonparseddata = JSON.parse(data);
  var quiztitle = jsonparseddata['pages'][0]['title'];
  var quiztitledesc = jsonparseddata['pages'][0]['description'];
  var teacherid=jsonparseddata['teacherid'];

  var myobj = {
    id: totalrows,
    json: data,
    quizname: quiztitle,
    quiztitledesc: quiztitledesc,
    ispublished: 0,
    Isedit: 1,
    startdate: '',
    enddate: '',
    studentrestriction: '',
    createdby:teacherid,
    createddate:curr
  };
  dbo.collection("QuizQuestion").insertOne(myobj, function (err) {
    if (err) throw err;
    res.send({
      status: "S001"
    });
    console.log("1 document inserted");
  });
});
app.post('/getQuizcount', function (req, res) {
  var dbo = database.db("ToolBoxQuiz");
  var objv = JSON.parse(JSON.stringify(req.body));
  console.log(objv[0])
  dbo.collection('QuizQuestion').find(objv[0]).toArray(function (err, result1) {
    res.send
    ({
      Count: result1.length
    });
  });
});
app.get('/getjsondata', function (req, res) {
  var dbo = database.db("ToolBoxQuiz");
  var pageNo = parseInt(req.query.pageNo)
  var createdby=req.query.teacherid
  var size = parseInt(req.query.size)
  var query = {};
  query.skip = size * (pageNo - 1)
  query.limit = size
  var getd={
    createdby:'1'
  }
  var mysort = {
    ispublished: 1,
    quizname: -1,
    
  };
  console.log(mysort)
  var collection = dbo.collection('QuizQuestion');
  return collection.find({
        'createdby': createdby
      }, query).sort(mysort).toArray(function (err, result) {
    collection.find({
      'createdby': createdby
    }).toArray(function (err, result1) {
      console.log(result)
      if (result1.length > 0) {
        result[0].totolrows = result1.length;
      }
      res.send(result);
    });
  });
});
app.post('/getquizstatusbyid', function (req, res) {
  var dbo = database.db("ToolBoxQuiz");
  var collection = dbo.collection('QuizQuestion');
  var objv = JSON.parse(JSON.stringify(req.body));
  console.log(objv[0])
  return collection.find(objv[0]).toArray(function (err, result) {
    if (result.length > 0) {
      res.send({
        status: "S001"
      });
    }
    else{
      res.send({
        status: "S002"
      });
    }
  })
});
app.post('/getstatusbyid', function (req, res) {
  var dbo = database.db("ToolBoxQuiz");
  var collection = dbo.collection('QuizQuestion');
  var objv = JSON.parse(JSON.stringify(req.body));
  return collection.find(objv[0]).toArray(function (err, result) {
    if (result.length > 0) {
      dbo.collection("Studentdata").find({
        'Quizid': objv[0]['id']
      }).toArray(function (err, doc) //find if a value exists
        {
          var totalstudent = result[0]["studentrestriction"];
          if (doc.length < totalstudent) {
            res.send({
              status: "S001"
            });
          } else {
            res.send({
              status: "S003"
            });
          }
        });
    } else
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
app.post('/registeruser', function (req, res) {
 
  var dbo = database.db("ToolBoxQuiz");
  autoIncrement.getNextSequence(dbo, "Login", function (err, autoIndex) {
    var usernameval = JSON.parse(JSON.stringify(req.body))[0]['Username'].toLowerCase()
  var passwordval = JSON.parse(JSON.stringify(req.body))[0]['password']
  var objv = {
    teacherid:autoIndex,
    username: usernameval,
    password: passwordval
  };
  dbo.collection("Login").find({
    'username': usernameval,
  }, {
    $exists: true
  }).toArray(function (err, doc) //find if a value exists
    {
      if (doc.length == 0) {
        dbo.collection("Login").insertOne(objv, function (err) {
          if (err) throw err;
          res.send({
            status: "S001"
          });
          console.log("1 document inserted");
        });
      } else {
        res.send({
          status: "S002"
        });
      }
    })
    console.log();
  });
});
app.post('/getloginstatus', function (req, res) {
  var dbo = database.db("ToolBoxQuiz");
  var usernameval = JSON.parse(JSON.stringify(req.body))[0]['Username']
  dbo.collection("Login").find({
    'username': usernameval
  }, {
    $exists: true
  }).toArray(function (err, doc) //find if a value exists
    {
      console.log(doc.length)
      if(doc.length>0){
        console.log(doc)
        res.send(doc);
      }      
      else{
        res.send({
          status: "S002"
        })
      }      
    });
});
app.post('/getretjsondataby', function (req, res) {
  var dbo = database.db("ToolBoxQuiz");
  var collection = dbo.collection('QuizQuestion');
  var objv = JSON.parse(JSON.stringify(req.body));
  return collection.find(objv[0]).toArray(function (err, result) {
    console.log(result)
    res.send(result[0]['json']);
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
  console.log(JSON.parse(JSON.stringify(req.body)))
  var myquery = {
    id: objv[0]['id']
  };
  var newvalues = {
    $set: {
      "ispublished": 1,
      "startdate": objv[0]['startdate'],
      "enddate": objv[0]['Enddate'],
      "studentrestriction": objv[0]['totalstudent']
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
  var updatequiz = {
    id: Quizid
  }
  dbo.collection("Studentdata").find({
    'studentname': studentname,
    'Quizid': Quizid
  }, {
    $exists: true
  }).toArray(function (err, doc) //find if a value exists
    {
      
      if (doc != '') //if it does
      {
        res.send({
          status: "S002"
        });

      } else // if it does not 
      {
        var newvalues = {
          $set: {
            "Isedit": 0,
          }
        };
        dbo.collection("QuizQuestion").updateOne(updatequiz, newvalues, function (err, res) {
          if (err) throw err;
          console.log("1 document updated");
        });
        dbo.collection("Studentdata").insertOne(myobj, function (err,doc1) {
          if (err) throw err;
          console.log(myobj.id);
          res.send({
            status: myobj.id
          });
          console.log("1 document inserted");
        }); // print out what it sends back
      }
    });
});
app.post('/getsubmittedstudentbyid', function (req, res) {
  var dbo = database.db("ToolBoxQuiz");
  var collection = dbo.collection('Studentdata');
  var objv = JSON.parse(JSON.stringify(req.body));
  console.log(objv[0])
  return collection.find(objv[0]).toArray(function (err, result) {
    console.log(result)
    res.send(result);
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
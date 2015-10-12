var express = require('express');
var app = express();
bodyparserthing=require('body-parser')
app.use(bodyparserthing.json());
app.use(bodyparserthing.urlencoded());
require("shelljs/global");
//---------------------------------------------------------------------------------------Import stuff
finstor=require("./finstor.js");



//-----------------------------------------------------------------------------------------GET

app.get("/user/:user", function(req,res){
  var which=req.params.user;
  res.send("Hello, "+req.params.user);
});
//edit test
app.get('/', function (req, res) {
  res.sendFile(__dirname+"/editor_proto.html");
});

app.get('/scripts/acemin/:sk', function (req, res) {
  res.sendFile(__dirname+"/scripts/acemin/"+req.params.sk);
});
app.get('/scripts/:sk', function (req, res) {
  res.sendFile(__dirname+"/scripts/"+req.params.sk);
});
app.get('/resources/:sk', function (req, res) {
  res.sendFile(__dirname+"/resources/"+req.params.sk);
});
app.get("/get_resolist",function (req, res) {
  var ret={}
  ret.solutions= finstor.findsolns();
  ret.algorithms = finstor.findalgs();
  ret.resources = {quandl:{name:"quandl"},yfinance:{name:"yfinance"},
                    robinhood:{name:"robinhood"},"robinhood buy":{name:"robinhood buy"}};
  res.json(ret);
});
app.get("/get_soln",function (req, res) {
  var which = req.body.solution;
  res.json(finstor.findsolns()[which]);
});
app.get("/get_algs",function (req, res) {
  var which = req.body.whichalg;
  var tlist={algorithms:{}};
  for (var i in which){
    if(which[i]){
      tlist.algorithms[i]=instor.findalgs()[i];
    }
  }
  res.json(tlist);
});

//REVISED SPEC
app.get("/get_names",function(req,res){
  res.json({algorithms:Object.keys(finstor.findalgs()),
            solutions:Object.keys(finstor.findsolns()),
            resources: Object.keys({'quandl BTC':{name:"quandl BTC"}/*,yfinance:{name:"yfinance"},
            robinhood:{name:"robinhood"},"robinhood buy":{name:"robinhood buy"}*/})
  });
});
app.get("/get_algorithms",function(req,res){
  var ret={};
  for(var i=0;i<req.query.algnames.length;i++){
    var nom=req.query.algnames[i];
    ret[nom]=finstor.findalgs()[nom];
  }
  res.json(ret);
});
app.get("/get_solution",function(req,res){
  ret={solution:finstor.findsolns()[req.query.solname],algorithms:{}};
  for(var gg in ret.solution.algorithms){
    ret.algorithms[gg]=finstor.findalgs()[gg];
  }
  res.send(ret);
});


//---------------------------------------------------------------------------------------POST
app.post("/save__", function (req, res){
  finstor.solution(req.body.solution);
  for(var i in req.body.algorithms){
    finstor.algorithm(req.body.algorithms[i]);
  }
  res.json({finished:true});
});

//------------------------------------------------------------------------------------SIMULATION THINGY
app.get("/simulate__",function(req,res){
  var qqqq=require("quandl");
  var quandl=new qqqq({auth_token: "7z3JG5zoHTxwyNECw2Cf"});
  quandl.dataset({ source: "BITCOIN", table: "MTGOXUSD" }, function(err, response){
    if(err){
        throw err;
    }else{
      res.json(response);
      /*var val=100;
      var quant=0;
      console.log(Object.keys(eval(response)));
      var price=eval(response).data;
      console.log(price);
      var buyfunc=eval(finstor.findalgs()[req.query.simalg]);
      for(var l=price.length-100;l<price.length;i++){
        var vqp=buyfunc(price.slice(0,l),val,quant);
        val-=price[l][1]*vqp;
        quant+=vqp;
      }
      val+=price[l][0]*quant;
      res.json({returns:(val-100)});*/
    }
  });
});



//---------------------------------------------------------------------------------------START UP SERVER

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

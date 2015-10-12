// Our main module for storing financial data, this should be replaced by a suitable database if
// I ever manage to be capable of using those.

//Stores require(finstor.js) has
// .solution  : add new solution
// .algorithm : add new algorithm

//Note, currently implementing as highly unsafe, free-for-all dictionaries. This
//is bad and would lead to lost data for >1 user

//Solution is implemented as just a workspace
//solutions  {name:"name",
//            algorithms:{alg1:{name: "alg1",xcoord:54,ycoord:69,output:["rbhbuy"]},
//                        rbhbuy:{name:"rbhbuy",xcoord:420,ycoord:420,ouput:[]}},
//            resources:{yfinance:{name:"yfinance",xcoord:1337,ycoord:68,ouput:["alg1"]}}
//           }

//algorithms {name:"alg1",
//            code:"using timeseries blah blah blah",
//            author:"swagman",
//            public:false,
//            publicdescr:null,  //would be json object with other properties
//            icon="resources/alg1.jpg"
//           }

solutiondict={};
algdict={};

var exports=module.exports={};
exports.solution=function(soln){
  solutiondict[soln.name]=soln;
}

exports.findsolns=function(){
  return solutiondict;
}

exports.algorithm=function(alg){
  algdict[alg.name]=alg;
}

exports.findalgs=function(){
  return algdict;
}

/*var pg = require('pg');
 var config = require('./config.json');

 //todo: move to config file
 var conString = config.postgres.url;
 if (process.env['DATABASE_URL']){
 console.log("environment variable: " + process.env['DATABASE_URL']);
 conString = process.env['DATABASE_URL'];
 }



 //execute a query and hide all the connection pool logic

 var executeSQL = function (sql,params,fn){
 //res.send('test');
 // get a pg client from the connection pool

 pg.connect(conString, function(err, client, done) {

 var handleError = function(err) {
 // no error occurred, continue with the request
 if(!err) return false;

 // An error occurred, remove the client from the connection pool.
 // A truthy value passed to done will remove the connection from the pool
 // instead of simply returning it to be reused.
 // In this case, if we have successfully received a client (truthy)
 // then it will be removed from the pool.
 done(client);
 return true;
 };

 if(client){
 // get the total number of visits today (including the current visit)
 client.query(sql, params, function(err, result) {

 // handle an error from the query
 if(handleError(err)) return fn(err,null);

 // return the client to the connection pool for other requests to reuse
 done();
 return fn(err,result);
 });
 }
 else{
 return fn('no client',null);
 }
 });

 }*/
var mysql = require('mysql');
var config = {
    "connectionLimit": 100,
    "host": "localhost",
    "user": "root",
    "password": "",
    "database": "node_test"
}

//todo: move to config file
var configConnection = config;


//execute a query and hide all the connection pool logic

var executeSQL = function (sql, params, fn) {
    //res.send('test');
    // get a pg client from the connection pool
    var pool = mysql.createPool(configConnection);
    pool.getConnection(function (err, client) {
        var handleError = function (err) {
            // no error occurred, continue with the request
            if (!err) return false;
            return true;
        };
        if (client) {
            // get the total number of visits today (including the current visit)
            client.query(sql, params, function (err, result) {

                //show sql:
                var sqlQuery = sql;
                for (var i = 0; i < params.length; i++) {
                    sqlQuery = sqlQuery.replace('\?', '\'' + params[i] + '\'');
                }


                // handle an error from the query
                if (handleError(err))
                {
                    return fn(err, null);
                }

                // return the client to the connection pool for other requests to reuse
                //done();
                return fn(err, result);
            });
        }
        else {
            console.log(client);
            console.log(err);
            return fn('Lost Connection', null);
        }
        // connected! (unless `err` is set)
    });
}

module.exports.executeSQL = executeSQL;

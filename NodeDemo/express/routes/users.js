var express = require('express');
var router = express.Router();
var db = require('../db');
var q=require('q');

/* GET users listing. */
router.get('/', function(req, res, next) {

    var sqlQuery= "select * from users";
    db.executeSQL(sqlQuery,[], function (err, result) {
        if(err){
            console.log(err);
            d.reject(err);
        }
        res.end(JSON.stringify(result));
    });
});

module.exports = router;

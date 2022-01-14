var express = require("express");
var path = require("path");
var app = express();
app.use(express.json())

var staticPath = path.resolve(__dirname, "public");
app.use(express.static(staticPath));

const MongoClient = require('mongodb').MongoClient;

let db;
MongoClient.connect('mongodb+srv://JE451:<Deacon34>@cluster-lesson.8cspb.mongodb.net/', (err, client) => {
    db = client.db('app')
})

app.param('collectionName', (req, res, next, collectionName) => {
    req.collection = db.collection(collectionName)
    return next()
})
app.get('/collection/:collectionName', (req, res, next) => {
    req.collection.find({}).toArray((e, results) => {
        if (e) return next(e)
        res.send(results)
    })
})
app.listen(3000);

/*
TypeError: Cannot read property 'collection' of undefined
    at D:\Users\Student\Desktop\coursework2\app.js:17:25
    at paramCallback (D:\Users\Student\Desktop\coursework2\node_modules\express\lib\router\index.js:410:7)
    at param (D:\Users\Student\Desktop\coursework2\node_modules\express\lib\router\index.js:390:5)
    at Function.process_params (D:\Users\Student\Desktop\coursework2\node_modules\express\lib\router\index.js:416:3)
    at next (D:\Users\Student\Desktop\coursework2\node_modules\express\lib\router\index.js:275:10)
    at SendStream.error (D:\Users\Student\Desktop\coursework2\node_modules\serve-static\index.js:121:7)
    at SendStream.emit (events.js:315:20)
    at SendStream.error (D:\Users\Student\Desktop\coursework2\node_modules\send\index.js:270:17)
    at SendStream.onStatError (D:\Users\Student\Desktop\coursework2\node_modules\send\index.js:421:12)
    at next (D:\Users\Student\Desktop\coursework2\node_modules\send\index.js:735:16)
*/
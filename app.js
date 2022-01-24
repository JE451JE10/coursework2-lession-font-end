// load Express.js
const express = require('express')
const app = express()
// parse the request parameters
app.use(express.json())

var path = require("path");
var staticPath = path.resolve(__dirname, "public");
app.use(express.static(staticPath));


// connect to MongoDB
let db;
const MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb+srv://JE451:Deacon34@cluster-lesson.8cspb.mongodb.net/', (err, client) => {
    if (err) {
        console.log("db mondodb error ", err)
        return
    }
    else {
        db = client.db('app')
    }
})

// get the collection name
app.param('collectionName', (req, res, next, collectionName) => {
    req.collection = db.collection(collectionName)
    return next()
})

// dispaly a message for root path to show that API is working
app.get('/database', function (req, res) {
    res.send('welcome to mongodb server')
})

// retrieve all the objects from an collection
app.get('/collection/:collectionName', (req, res) => {
    req.collection.find({}).toArray((e, results) => {
        if (e) return next(e)
        res.send(results)
    })
})

// add an object
app.post('/collection/:collectionName', (req, res, next) => {
    req.collection.insert(req.body, (e, results) => {
        if (e) return next(e)
        res.send(results.ops)
    })
})


// retrieve an object by mongodb ID
const Subject= require('mongodb').Subject;
app.get('/collection/:collectionName/:Subject', (req, res, next) => {
    req.collection.findOne(
        { Subject: new Subject(req.params.Subject) }, (e, result) => {
            if (e) return next(e)
            res.send(result)
        })
})

// update an object by ID
app.put('/collection/:collectionName/:Subject', (req, res, next) => {
    req.collection.update({ Subject: new Subject(req.params.Subject) },
        { $set: req.body }, { safe: true, multi: false }, (e, result) => {
            if (e) return next(e)
            res.send((result.result.n === 1) ?
                { msg: 'success' } : { msg: 'error' })
        })
})

// delete an object by ID
app.delete('/collection/:collectionName/:Subject', (req, res, next) => {
    req.collection.deleteOne(
        { Subject: Subject(req.params.Subject) }, (e, result) => {
            if (e) return next(e)
            res.send((result.result.n === 1) ?
                { msg: 'success' } : { msg: 'error' })
        })
})
app.listen(3000)
// load Express.js
const express = require('express')
const app = express()
// parse the request parameters
app.use(express.json())

var path = require("path");
var staticPath = path.resolve(__dirname, "public");
app.use(express.static(staticPath));


// connect to MongoDB
const MongoClient = require('mongodb').MongoClient;
let db;
MongoClient.connect('mongodb+srv://JE451:<Deacon34>@cluster-lesson.8cspb.mongodb.net/app?retryWrites=true&w=majority', (err, client) => {
    db = client.db('app')
})

// get the collection name
app.param('collectionName', (req, res, next, collectionName) => {
    req.collection = db.collection(collectionName)
    // console.log('collection name:', req.collection)
    return next()
})

// dispaly a message for root path to show that API is working
app.get('/', function (req, res) {
    res.send('Select a collection, e.g., /collection/messages')
})

// retrieve all the objects from an collection
app.get('/collection/:collectionName', (req, res) => {
    req.collection.find({}).toArray((e, results) => {
        if (e) return next(e)
        res.send(results)
    })
})

app.listen(3000)
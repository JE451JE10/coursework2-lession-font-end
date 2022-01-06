var express = require("express");
var path = require("path");
var app = express();

var apiRouter = require("./Jamesroutes");

var staticPath = path.resolve(__dirname, "public");
app.use(express.static(staticPath));

app.use("/James", apiRouter);
app.listen(3000);
const mongoose = require('mongoose');

const mongodb = "mongodb://127.0.0.1/my_database";
mongoose.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, "mongodb connection error"));

db.on('connect', console.error.bind(console, "successfully connected to mongodb"));
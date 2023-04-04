const express = require('express');
const bodyParser = require('body-parser');
const errorHandler = require('./app/helpers/error-handler.helper');
const jwt = require('./app/helpers/jwt.helper');
const app = express();
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors());
app.options('*', cors());

app.use(jwt.jwt());

const dbConfig = require('./config/database.config');
const mongoose = require('mongoose');

mongoose.connect(dbConfig.url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
	console.log('mongodb is connected!');
});

app.use((req, res,next) => {
	console.log("::::::::::::::::req.body", req.body);
	next();
})
const userRoute = require('./app/routes/user.route');
app.use('/users', userRoute);

// app.post('/users/registerMe',(req,res) => {

// 	console.log("Hello");

// })

// app.use('/users', require('./users/users.controller'));

// global error handler
app.use(errorHandler);

// listen for requests
app.listen(3000, () => {
	console.log("Server is listening on port 3000");
});
var express = require('express');
var path = require('path');
var http = require('http');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Get defined routing files
var index = require('./server/routes/app');
const messageRoutes = require('./server/routes/messages');
const contactRoutes = require('./server/routes/contacts');
const documentsRoutes = require('./server/routes/documents');

var app = express();

// Use logger
app.use(logger('dev'));

// Use body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Use cookie parser
app.use(cookieParser());

// Serve static files from the dist folder
app.use(express.static(path.join(__dirname, 'dist/cms/browser')));

// Tell express to map the default route ("/") to the index route
app.use('/', index);

// Tell express to map URLs to the route files
app.use('/messages', messageRoutes);
app.use('/contacts', contactRoutes);
app.use('/documents', documentsRoutes);

// Tell express to map all other non-defined routes back to the index page
// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.render('index');
});

// Get port from environment and store in Express
const port = process.env.PORT || '3000';
app.set('port', port);

// Create HTTP server
const server = http.createServer(app);

// Listen on provided port, on all network interfaces
server.listen(port, function() {
  console.log('Server running on localhost:' + port);
});

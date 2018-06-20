// load the Log library
var Log = require('log')
// set logging level
var log = new Log('info');

// load the ui
var UI = require('./ui');
ui.setup();

// create a client socket to connect to server
var Client = require('./client')
var client = new Client();

client.connect(5000, "localhost");
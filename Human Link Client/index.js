// load the Log library
var Log = require('log')
// set logging level
var log = new Log('info');

// load the ui
var ui = require('./ui/ui');
ui.setup();

// create a client socket to connect to server
var client = require('./client/client')
client.setup(5000, "localhost");
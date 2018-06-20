// load the Log library
var Log = require('log')
// set logging level
var log = new Log('info');

// load the controller
var Controller = require('./controller');
var controller = new Controller();

// start the ui
controller.ui.serve("/ui/index.html");
controller.ui.find_port_and_listen();
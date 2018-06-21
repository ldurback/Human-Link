// initialize the controller
var Controller = require('./controller');
var controller = new Controller();

// start the ui
controller.uiHost.serve("/ui/index.html");
controller.uiHost.find_port_and_listen();
// initialize the controller
import Controller from './controller';
var controller = new Controller();

// start the ui
controller.uiHost.serve("/ui/index.html");
controller.uiHost.find_port_and_listen();
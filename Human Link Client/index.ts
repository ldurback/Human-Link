// initialize the controller
import Controller from './controller';
var controller = new Controller();

// start the ui
controller.uiHost.serve("www");
controller.uiHost.find_port_and_listen();
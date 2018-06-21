// initialize the controller
import Controller from './controller';
var controller = new Controller();

// start the ui
controller.uiHost.serve("../UI");
controller.uiHost.find_port_and_listen();
import LiveLinkServer from "./LiveLinkServer";

var llServer = new LiveLinkServer();
llServer.listen(() => {
    console.log("Live Link Server listening at ", llServer.address());
});

const SMTPServer = require("smtp-server").SMTPServer;

const server = new SMTPServer({
    allowInsecureAuth: true,
    authOptional: true,
    onConnect(session, cb) {
        console.log("onConnect", session.id);
        cb(); // For accepting
        // cb(new Error("Cannot Access")); For rejecting
    },
    onMailFrom(address, session, cb) {
        console.log("onMailFrom", address.address, session.id);
        cb();
    },
    onRcptTo(address, session, cb) {
        console.log("onMailFrom", address.address, session.id);
        cb();
    },
    onData(stream, session, cb) {
        console.log("onData", session.id);
        stream.on("data", (data) => {
            console.log("onData", data.toString());
    });
    stream.on("end", cb);
    }
});

server.listen(25, () => console.log("Server running on 25"));
#!/usr/bin/env node

const childProcess = require("child_process");
const http = require("http");

const lw = `${process.env.NAUGHT_WORKER}(${process.pid})`

function redeploy(res) {
    childProcess.execFile("node", ["./node_modules/naught/lib/main", "deploy", "/app/naught.ipc"], { cwd: process.cwd() }, (err, stdout, stderr) => {
        if (err) {
            console.log(`[${lw}][error]`, err);
        }
        console.log(`[${lw}] Executing naught deploy command`);
        console.log(`[${lw}][stderr]`, stderr);
        console.log(`[${lw}][stderr]`, stdout);
    });

    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end();

    console.log(`[${lw}] Finshed processing deploy request`);
}

function status(res) {
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.write(`Worker ${lw} checking in`)
    res.end();
}

process.on('message', (msg) => {
    console.log(`[${lw}] Recieved message:`, msg);

    if (msg === "shutdown") {
        console.log(`[${lw}] Shutting down`);
        process.exit(0);
    }
});

http.createServer((req, res) => {
    if (req.url === "/redeploy") {
        redeploy(res);
    } else {
        status(res);
    }
}).listen(8080, () => {
    process.send("online");

    console.log(`[${lw}] Listening on port 8080`);
}); 

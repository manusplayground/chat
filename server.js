const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const ejs = require("ejs");
const dependencies = require("./container");

dependencies.resolve(() => {
    const app = setupExpress();

    function setupExpress() {
        const app = express();
        const server = http.createServer(app);
        server.listen('8888', () => {
            console.log("listening on port 8888");
        })
    }
})
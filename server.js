const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const ejs = require("ejs");
const container = require("./container");

container.resolve(function(users) {
    const app = setupExpress();

    function setupExpress() {
        const app = express();
        const server = http.createServer(app);
        server.listen('8888', () => {
            console.log("listening on port 8888");
        });

        configureExpress(app);

        const router = require("express-promise-router")();
       
        users.setRouting(router);

        app.use(router);
    }

    function configureExpress(app) {
        app.use(express.static("public"));
        app.set("view engine", "ejs");
        app.set(bodyParser.json());
        app.set(bodyParser.urlencoded({extended: true}));
    }
})
const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const ejs = require("ejs");
const session = require("express-session");
const validator = require("express-validator");
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo")(session);
const flash = require("connect-flash");
const mongoose = require("mongoose");
const passport = require("passport");
const container = require("./container");

container.resolve(function(users) {
    const app = setupExpress();

    function setupExpress() {
        const app = express();
        const server = http.createServer(app);
        server.listen('8877', () => {
            console.log("listening on port 8877");
        });

        configureExpress(app);

        const router = require("express-promise-router")();
       
        users.setRouting(router);

        app.use(router);
    }

    function configureExpress(app) {
        app.use(express.static("public"));
        app.set("view engine", "ejs");
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(validator());
        app.use(cookieParser());
        app.use(session({
            secret: "kimmiethepoodledumb",
            resave: true,
            saveUninitialized: false,
            store: new MongoStore({mongooseConnection: mongoose.connection})
        }));
        app.use(passport.initialize());
        app.use(passport.session());
        app.use(flash());
    }
})
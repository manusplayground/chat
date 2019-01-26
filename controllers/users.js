'use strict';

module.exports = function(_, passport, UserUtils) {
    return {
        setRouting: function(router) {
            router.get("/", this.indexPage);
            router.get("/signup", this.signupPage);
            router.post("/signup", UserUtils.signupValidation, this.postSignUp);
            router.get("/home", this.homePage);
            router.post("/login", UserUtils.loginValidation, this.postSignIn);
        },

        indexPage: function(req, res) {
            const errors = req.flash("error");
            return res.render("index", {title: "Chat | Login", messages: errors, hasErrors: errors.length > 0});
        },

        signupPage: function(req, res) {
            const errors = req.flash("error");
            return res.render("signup", {title: "Chat | User Registration", messages: errors, hasErrors: errors.length > 0});
        },

        postSignUp: passport.authenticate("local.signup", {
            successRedirect: "/home",
            failureRedirect: "/signup",
            failureFlash: true
        }),

        homePage: function(req, res) {
            return res.render("home");
        },

        postSignIn: passport.authenticate("local.login", {
            successRedirect: "/home",
            failureRedirect: "/",
            failureFlash: true
        }),
    }
}

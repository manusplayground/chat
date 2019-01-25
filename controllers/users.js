'use strict';

module.exports = function(_, passport, UserUtils) {
    return {
        setRouting: function(router) {
            router.get("/", this.indexPage);
            router.get("/signup", this.signupPage);
            router.post("/signup", UserUtils.signupValidation, this.postSignUp);
            router.get("/home", this.homePage);
        },

        indexPage: function(req, res) {
            return res.render("index");
        },

        signupPage: function(req, res) {
            const errors = req.flash("error");
            return res.render("signup", {title: "Chat | Login", messages: errors, hasErrors: errors.length > 0});
        },

        postSignUp: passport.authenticate("local.signup", {
            successRedirect: "/home",
            failureRedirect: "/signup",
            failureFlash: true
        }),

        homePage: function(req, res) {
            return res.render("home");
        },
    }
}

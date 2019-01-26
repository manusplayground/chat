'use strict';

module.exports = function() {
    return {
        signupValidation: (req, res, next) => {
            req.checkBody("username", "Username is a required form field").notEmpty();
            req.checkBody("username", "Username length should not be less than 5 characters").isLength({min: 5});
            req.checkBody("email", "Email is a required form field").notEmpty();
            req.checkBody("email", "Email is invalid").isEmail();
            req.checkBody("password", "Password is a required form field").notEmpty();
            req.checkBody("password", "Password length should not be less than 8 characters").isLength({min: 8});

            req.getValidationResult().then((result) => {
                const errors = result.array();
                const messages = [];
                errors.forEach(error => {
                    console.log(error.msg);
                    messages.push(error.msg)
                });

                req.flash("error", messages);
                res.redirect("/signup");
            })
            .catch((err) => {
                return next();
            });
        },

        loginValidation: (req, res, next) => {
            req.checkBody("email", "Email is a required form field").notEmpty();
            req.checkBody("email", "Email is invalid").isEmail();
            req.checkBody("password", "Password is a required form field").notEmpty();
            req.checkBody("password", "Password length should not be less than 8 characters").isLength({min: 8});

            req.getValidationResult().then((result) => {
                const errors = result.array();
                const messages = [];
                errors.forEach(error => {
                    console.log(error.msg);
                    messages.push(error.msg)
                });

                req.flash("error", messages);
                res.redirect("/");
            })
            .catch((err) => {
                return next();
            });
        }
    }
}
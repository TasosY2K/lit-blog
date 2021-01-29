const db = require("../../models");

module.exports = (app, globalConfig) => {
    app.get("/admin", (req, res) => {
        if (req.session.loggedin) {
            res.redirect("/admin/dashboard");
        } else {
            res.redirect("/login");
        }
    });

    app.get("/admin/dashboard", (req, res) => {
        if (req.session.loggedin) {
            res.render("adminDashboard", {
                global: globalConfig,
                username: req.session.username,
            });
        } else {
            res.redirect("/login");
        }
    });

    app.get("/admin/post", (req, res) => {
        if (req.session.loggedin) {
            db.Posts.findAll().then((results) => {
                if (results.length > 0) {
                    res.render("adminPost", {
                        global: globalConfig,
                        username: req.session.username,
                        postData: results,
                    });
                } else {
                    res.render("adminPost", {
                        global: globalConfig,
                        username: req.session.username,
                    });
                }
            });
        } else {
            res.redirect("/login");
        }
    });

    app.get("/admin/settings", (req, res) => {
        if (req.session.loggedin) {
            db.Settings.findAll().then((results) => {
                res.render("adminSettings", {
                    global: globalConfig,
                    username: req.session.username,
                    settingData: results[0],
                });
            });
        } else {
            res.redirect("/login");
        }
    });
};

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
            db.Settings.findAll().then((results) => {
                res.render("adminDashboard", {
                    global: globalConfig,
                    username: req.session.username,
                    settings: results[0],
                });
            });
        } else {
            res.redirect("/login");
        }
    });

    app.get("/admin/post", (req, res) => {
        if (req.session.loggedin) {
            db.Settings.findAll().then((settings) => {
                db.Posts.findAll().then((results) => {
                    if (results.length > 0) {
                        res.render("adminPost", {
                            global: globalConfig,
                            username: req.session.username,
                            postData: results,
                            settings: settings[0],
                        });
                    } else {
                        res.render("adminPost", {
                            global: globalConfig,
                            username: req.session.username,
                            settings: settings[0],
                        });
                    }
                });
            });
        } else {
            res.redirect("/login");
        }
    });

    app.get("/admin/project", (req, res) => {
        if (req.session.loggedin) {
            db.Settings.findAll().then((settings) => {
                db.Projects.findAll().then((results) => {
                    if (results.length > 0) {
                        res.render("adminProject", {
                            global: globalConfig,
                            username: req.session.username,
                            postData: results,
                            settings: settings[0],
                        });
                    } else {
                        res.render("adminProject", {
                            global: globalConfig,
                            username: req.session.username,
                            settings: settings[0],
                        });
                    }
                });
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

    app.get("/admin/about", (req, res) => {
        if (req.session.loggedin) {
            db.Settings.findAll().then((settings) => {
                db.About.findAll().then((results) => {
                    res.render("adminAbout", {
                        global: globalConfig,
                        username: req.session.username,
                        aboutData: results[0],
                        settingData: settings[0].dataValues,
                    });
                });
            });
        } else {
            res.redirect("/login");
        }
    });
};

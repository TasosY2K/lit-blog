const db = require("../../models");
const bcrypt = require("bcryptjs");

module.exports = (app, globalConfig) => {
    app.get("/login", (req, res) => {
        if (req.session.loggedin) {
            res.redirect("/admin");
        } else {
            db.Settings.findAll().then((settings) => {
                res.render("login", {
                    global: globalConfig,
                    settings: settings[0].dataValues,
                });
            });
        }
    });

    app.post("/login", (req, res) => {
        let username = req.body.username;
        let password = req.body.password;
        if (username && password) {
            db.Users.findAll({
                where: {
                    username: username,
                },
            }).then((results) => {
                if (results.length > 0) {
                    if (
                        bcrypt.compareSync(password, results[0].dataValues.hash)
                    ) {
                        req.session.loggedin = true;
                        req.session.username = username;
                        req.session.password = password;
                        res.redirect("/admin");
                    } else {
                        db.Settings.findAll().then((settings) => {
                            res.render("login", {
                                error: "Incorrect username or password",
                                global: globalConfig,
                                settings: settings[0].dataValues,
                            });
                        });
                    }
                } else {
                    db.Settings.findAll().then((settings) => {
                        res.render("login", {
                            error: "Incorrect username or password",
                            global: globalConfig,
                            settings: settings[0].dataValues,
                        });
                    });
                }
            });
        } else {
            db.Settings.findAll().then((settings) => {
                res.render("login", {
                    error: "Empty fields",
                    global: globalConfig,
                    settings: settings[0].dataValues,
                });
            });
        }
    });
};

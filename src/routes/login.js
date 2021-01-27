const db = require("../../models");
const bcrypt = require("bcryptjs");

module.exports = (app, globalConfig) => {
    app.get("/login", (req, res) => {
        if (req.session.loggedin) {
            res.redirect("/admin");
        } else {
            res.render("login");
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
                        res.render("login", { error: "Incorrect password" });
                    }
                } else {
                    res.render("login", { error: "User doesn't exist" });
                }
            });
        } else {
            res.render("login", { error: "Empty fields" });
        }
    });
};

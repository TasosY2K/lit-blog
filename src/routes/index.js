const db = require("../../models");

module.exports = (app, globalConfig) => {
    app.get("/", (req, res) => {
        db.Posts.findAll().then((results) => {
            if (results.length > 0) {
                res.render("index", {
                    global: globalConfig,
                    username: req.session.username,
                    postData: results,
                });
            } else {
                res.render("index", {
                    global: globalConfig,
                    username: req.session.username,
                });
            }
        });
    });
};

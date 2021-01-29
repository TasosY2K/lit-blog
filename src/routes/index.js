const db = require("../../models");

module.exports = (app, globalConfig) => {
    app.get("/", (req, res) => {
        db.Settings.findAll().then((settings) => {
            siteSettings = settings[0].dataValues;
            db.Posts.findAll().then((results) => {
                if (results.length > 0) {
                    res.render("index", {
                        global: globalConfig,
                        settings: siteSettings,
                        username: req.session.username,
                        postData: results,
                    });
                } else {
                    res.render("index", {
                        global: globalConfig,
                        settings: siteSettings,
                        username: req.session.username,
                    });
                }
            });
        });
    });
};

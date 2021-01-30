const db = require("../../models");

module.exports = (app, globalConfig) => {
    app.get("/", (req, res) => {
        db.Settings.findAll().then((settings) => {
            const siteSettings = settings[0].dataValues;

            let options = {};

            options.global = globalConfig;
            options.settings = siteSettings;
            options.username = req.session.username;

            db.Posts.findAll().then((results1) => {
                if (results1.length > 0) {
                    options.postData = results1;
                }
                db.Projects.findAll().then((results2) => {
                    if (results2.length > 0) {
                        options.projectData = results2;
                    }
                    res.render("index", options);
                });
            });
        });
    });
};

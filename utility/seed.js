const db = require("../models");

const siteSettings = {
    siteName: "My Blog",
    siteDescription: "My blog description",
    siteImage:
        "",
    siteIcon: "",
};

db.Settings.findAll().then((results) => {
    if (results.length <= 0) {
        db.Settings.create(siteSettings).then(() => {
            console.log("Database seeded successfully");
        });
    }
});

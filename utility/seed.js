const fs = require("fs");
const db = require("../models");

const siteSettings = {
    siteName: "My Blog",
    siteDescription: "My blog description",
    siteImage:
        "/img/siteImage.png",
    siteIcon: "/img/siteIcon.png",
};

db.Settings.findAll().then((results) => {
    if (results.length <= 0) {
        db.Settings.create(siteSettings).then(() => {
            console.log("Database seeded successfully");
        });
    }
});

fs.copyFileSync("./assets/siteImage.png", "./images/siteImage.png");
fs.copyFileSync("./assets/siteIcon.png", "./images/siteIcon.png");

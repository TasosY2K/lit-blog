const fs = require("fs");
const db = require("../models");

const siteSettings = {
    siteName: "My Blog",
    siteDescription: "My blog description",
    siteImage: "/img/siteImage.png",
    siteIcon: "/img/siteIcon.png",
    instagram: "https://www.instagram.com/tasos.js",
    facebook: "https://m.me/george.greenman.37",
    email: "gustavolama20@gmail.com",
};

const siteAbout = {
    content: JSON.stringify([{ insert: "About content\n" }]),
    contentText: "About content",
    image1: "/img/aboutImage1.png",
    image2: "/img/aboutImage2.png",
    image3: "/img/aboutImage3.png",
};

db.Settings.findAll().then((results) => {
    if (results.length <= 0) {
        db.Settings.create(siteSettings).then(() => {
            console.log("Settings seeded successfully");
        });
    }
});

db.About.findAll().then((results) => {
    if (results.length <= 0) {
        db.About.create(siteAbout).then(() => {
            console.log("About info seeded successfully");
        });
    }
});

fs.copyFileSync("./assets/siteImage.png", "./images/siteImage.png");
fs.copyFileSync("./assets/siteIcon.png", "./images/siteIcon.png");

fs.copyFileSync("./assets/aboutImage1.png", "./images/aboutImage1.png");
fs.copyFileSync("./assets/aboutImage2.png", "./images/aboutImage2.png");
fs.copyFileSync("./assets/aboutImage3.png", "./images/aboutImage3.png");

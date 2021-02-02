const fs = require("fs");
const db = require("../models");
const slug = require("speakingurl");
const bcrypt = require("bcryptjs");
const gen = require("../utility/generator.js");

const folders = ["uploads", "images"];

folders.forEach((folder) => {
    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder);
    }
});

const username = gen.username();
const password = gen.password();
const hash = bcrypt.hashSync(password);

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
    content: JSON.stringify([{ insert: "About page description\n" }]),
    contentText: "About page description",
    image1: "/img/aboutImage1.png",
    image2: "/img/aboutImage2.png",
    image3: "/img/aboutImage3.png",
};

const postData = {
    id: gen.id(),
    title: "Your first post",
    url: slug("Your first post"),
    author: "System",
    content: JSON.stringify([
        { insert: "Welcome to Lit Blog " },
        { attributes: { color: "#e9e9e9" }, insert: "🔥 v1.0.4" },
        { attributes: { header: 1 }, insert: "\n" },
        { insert: "\nUse this post as a quick guide to get you started" },
        { attributes: { header: 2 }, insert: "\n" },
        { insert: "\n" },
        {
            attributes: { color: "#ffffff", background: "#ff0000", bold: true },
            insert:
                "Don't forget to delete it after since it contains account credidentials",
        },
        { insert: "\n\nLogin to your " },
        { attributes: { bold: true }, insert: "admin account" },
        { insert: " " },
        { attributes: { link: "/login" }, insert: "here" },
        { insert: " using these " + username + ":" + password },
        { attributes: { list: "ordered" }, insert: "\n" },
        { insert: "Once you have logged in create a " },
        { attributes: { bold: true }, insert: "post " },
        { attributes: { link: "/admin/post" }, insert: "here" },
        { attributes: { list: "ordered" }, insert: "\n" },
        { insert: "Manage your " },
        { attributes: { bold: true }, insert: "projects " },
        { attributes: { link: "/admin/project" }, insert: "here" },
        { insert: ", " },
        { attributes: { bold: true }, insert: "projects " },
        { insert: "allow " },
        { attributes: { underline: true }, insert: "more images" },
        { insert: " than posts and are used to showcase your work" },
        { attributes: { list: "ordered" }, insert: "\n" },
        { attributes: { bold: true }, insert: "Site settings" },
        { insert: " are " },
        { attributes: { link: "/admin/settings" }, insert: "here" },
        { insert: ", from there you can edit your " },
        { attributes: { underline: true }, insert: "SEO information" },
        { insert: ", add your " },
        { attributes: { underline: true }, insert: "social media links" },
        { insert: " and change the " },
        { attributes: { underline: true }, insert: "site's images" },
        { attributes: { list: "ordered" }, insert: "\n" },
        { attributes: { bold: true }, insert: "About page" },
        { insert: " settings are " },
        { attributes: { link: "/admin/about" }, insert: "here" },
        { insert: ", the " },
        { attributes: { bold: true }, insert: "About page" },
        {
            insert:
                " is supposed to be a personal portfolio where you can add ",
        },
        {
            attributes: { underline: true },
            insert: "photos and info about your self",
        },
        { attributes: { list: "ordered" }, insert: "\n" },
    ]),
    contentText: `
        Welcome to Lit Blog 🔥 v1.0.4

        Use this post as a quick guide to get you started

        Don't forget to delete it after since it contains account credidentials

        Login to your admin account here using these 
        Once you have logged in create a post here
        Manage your projects here, projects allow more images than posts and are used to showcase your work
        Site settings are here, from there you can edit your SEO information, add your social media links and change the site's images
        About page settings are here, the About page is supposed to be a personal portfolio where you can add photos and info about your self
    `,
    image: "aboutImage1.png",
};

(async () => {
    await db.sequelize.sync();

    await db.Users.create({
        id: gen.id(),
        username: username,
        hash: hash,
    }).then(() => {
        console.log("User seeded succesfully");
    });

    await db.Settings.findAll().then((results) => {
        if (results.length <= 0) {
            db.Settings.create(siteSettings).then(() => {
                console.log("Settings seeded successfully");
            });
        }
    });

    await db.About.findAll().then((results) => {
        if (results.length <= 0) {
            db.About.create(siteAbout).then(() => {
                console.log("About seeded successfully");
            });
        }
    });

    await db.Posts.create(postData).then(() => {
        console.log("First post created");
    });
})();

fs.copyFileSync("./assets/siteImage.png", "./images/siteImage.png");
fs.copyFileSync("./assets/siteIcon.png", "./images/siteIcon.png");

fs.copyFileSync("./assets/aboutImage1.png", "./images/aboutImage1.png");
fs.copyFileSync("./assets/aboutImage2.png", "./images/aboutImage2.png");
fs.copyFileSync("./assets/aboutImage3.png", "./images/aboutImage3.png");

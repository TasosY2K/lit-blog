const fs = require("fs");
const slug = require("speakingurl");
const multer = require("multer");
const db = require("../../models");
const gen = require("../../utility/generator.js");

module.exports = (app, globalConfig) => {
    const upload = multer({ dest: "./uploads" });

    app.get("/post/all", (req, res) => {
        db.Settings.findAll().then((settings) => {
            siteSettings = settings[0].dataValues;
            db.Posts.findAll().then((results) => {
                if (results.length > 0) {
                    res.render("allPosts", {
                        global: globalConfig,
                        settings: siteSettings,
                        username: req.session.username,
                        postData: results,
                    });
                } else {
                    res.render("allPosts", {
                        global: globalConfig,
                        settings: siteSettings,
                        username: req.session.username,
                    });
                }
            });
        });
    });

    app.get("/post/:id", (req, res) => {
        res.render("post");
    });

    app.get("/post/content/:id", (req, res) => {
        if (req.session.loggedin) {
            const id = req.params.id;
            if (id) {
                db.Posts.findAll({
                    where: {
                        id: id,
                    },
                }).then((results) => {
                    if (results.length > 0) {
                        res.status(200).json({
                            id: results[0].id,
                            title: results[0].title,
                            url: results[0].url,
                            author: results[0].author,
                            content: results[0].content,
                            contentText: results[0].contentText,
                            image: results[0].image,
                        });
                    } else {
                        res.status(404).send("Post not found");
                    }
                });
            } else {
                res.status(406).send("Missing fields");
            }
        } else {
            res.status(401).send("Not authorized");
        }
    });

    app.post("/post/create", upload.single("image"), (req, res) => {
        if (req.session.loggedin) {
            const id = gen.id();
            const title = req.body.title;
            const content = req.body.content;
            const contentText = req.body.contentText;
            const author = req.session.username;
            const ext = req.file.originalname.split(".")[
                req.file.originalname.split(".").length - 1
            ];
            fs.copyFileSync(req.file.path, "./images/" + id + "." + ext);
            fs.unlinkSync(req.file.path);
            if (title && content && contentText) {
                db.Posts.create({
                    id: id,
                    title: title,
                    url: slug(title),
                    author: author,
                    content: content,
                    contentText: contentText,
                    image: id + "." + ext,
                }).then(() => {
                    res.redirect("/admin/post");
                });
            } else {
                res.render("error", {
                    title: "Input Error",
                    message: "Content field is missing",
                });
            }
        } else {
            res.render("error", {
                title: "Unauthorized",
                message: "You must be logged in to use this endpoint",
            });
        }
    });

    app.post("/post/edit/:id", upload.single("image"), (req, res) => {
        if (req.session.loggedin) {
            const id = req.params.id;
            const title = req.body.title;
            const content = req.body.content;
            const contentText = req.body.contentText;

            let options = {};

            if (req.file) {
                const ext = req.file.originalname.split(".")[
                    req.file.originalname.split(".").length - 1
                ];
                fs.copyFileSync(req.file.path, "./images/" + id + "." + ext);
                fs.unlinkSync(req.file.path);
                options = {
                    title: title,
                    content: content,
                    contentText: contentText,
                    image: id + "." + ext,
                };
            } else {
                options = {
                    title: title,
                    content: content,
                    contentText: contentText,
                };
            }

            if (id && title && content && contentText) {
                db.Posts.update(options, {
                    where: {
                        id: id,
                    },
                });
                res.redirect("/admin/post");
            } else {
                res.render("error", {
                    title: "Input Error",
                    message: "Missing field",
                });
            }
        } else {
            res.render("error", {
                title: "Unauthorized",
                message: "You must be logged in to use this endpoint",
            });
        }
    });

    app.post("/post/delete/:id", (req, res) => {
        if (req.session.loggedin) {
            const id = req.params.id;
            if (id) {
                db.Posts.findAll({
                    where: {
                        id: id,
                    },
                }).then((results) => {
                    if (results.length > 0) {
                        db.Posts.destroy({
                            where: {
                                id: id,
                            },
                        });
                        res.redirect("/admin/post");
                        fs.unlinkSync("./images/" + results[0].image);
                    }
                });
            } else {
                res.render("error", {
                    title: "Input Error",
                    message: "Missing field",
                });
            }
        } else {
            res.render("error", {
                title: "Unauthorized",
                message: "You must be logged in to use this endpoint",
            });
        }
    });
};

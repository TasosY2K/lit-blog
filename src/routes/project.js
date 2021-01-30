const fs = require("fs");
const slug = require("speakingurl");
const multer = require("multer");
const QuillDeltaToHtmlConverter = require("quill-delta-to-html")
    .QuillDeltaToHtmlConverter;
const db = require("../../models");
const gen = require("../../utility/generator.js");

module.exports = (app, globalConfig) => {
    const upload = multer({ dest: "./uploads" });

    app.get("/project/all", (req, res) => {
        db.Settings.findAll().then((settings) => {
            siteSettings = settings[0].dataValues;
            db.Project.findAll().then((results) => {
                if (results.length > 0) {
                    res.render("allProjects", {
                        global: globalConfig,
                        settings: siteSettings,
                        username: req.session.username,
                        postData: results,
                    });
                } else {
                    res.render("allProjects", {
                        global: globalConfig,
                        settings: siteSettings,
                        username: req.session.username,
                    });
                }
            });
        });
    });

    app.get("/project/:url", (req, res) => {
        const url = req.params.url;
        if (url) {
            db.Projects.findAll({
                where: {
                    url: url,
                },
            }).then((results) => {
                if (results.length > 0) {
                    db.Settings.findAll().then((settings) => {
                        siteSettings = settings[0].dataValues;
                        res.render("project", {
                            global: globalConfig,
                            settings: siteSettings,
                            postData: results[0].dataValues,
                        });
                    });
                } else {
                    res.render("error", {
                        title: "Post not found",
                        message: "Post not found or removed",
                    });
                }
            });
        } else {
            res.status(406).send("Missing fields");
        }
    });

    app.get("/project/content/:id", (req, res) => {
        if (req.session.loggedin) {
            const id = req.params.id;
            if (id) {
                db.Projects.findAll({
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
                            image1: results[0].image1,
                            image2: results[0].image2,
                            image3: results[0].image3,
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

    app.post(
        "/project/create",
        upload.fields([
            {
                name: "image1",
                maxCount: 1,
            },
            {
                name: "image2",
                maxCount: 1,
            },
            {
                name: "image3",
                maxCount: 1,
            },
        ]),
        (req, res) => {
            if (req.session.loggedin) {
                const id = gen.id();
                const title = req.body.title;
                const content = req.body.content;
                const contentText = req.body.contentText;
                const author = req.session.username;

                const ext1 = req.files.image1[0].originalname.split(".")[
                    req.files.image1[0].originalname.split(".").length - 1
                ];
                fs.copyFileSync(
                    req.files.image1[0].path,
                    "./images/" + id + "_1." + ext1
                );
                fs.unlinkSync(req.files.image1[0].path);

                const ext2 = req.files.image2[0].originalname.split(".")[
                    req.files.image2[0].originalname.split(".").length - 1
                ];
                fs.copyFileSync(
                    req.files.image2[0].path,
                    "./images/" + id + "_2." + ext2
                );
                fs.unlinkSync(req.files.image2[0].path);

                const ext3 = req.files.image3[0].originalname.split(".")[
                    req.files.image3[0].originalname.split(".").length - 1
                ];
                fs.copyFileSync(
                    req.files.image3[0].path,
                    "./images/" + id + "_3." + ext3
                );
                fs.unlinkSync(req.files.image3[0].path);

                if (title && content && contentText) {
                    db.Projects.create({
                        id: id,
                        title: title,
                        url: slug(title),
                        author: author,
                        image1: id + "_1." + ext1,
                        image2: id + "_2." + ext2,
                        image3: id + "_3." + ext3,
                        content: content,
                        contentText: contentText,
                    }).then(() => {
                        res.redirect("/admin/project");
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
        }
    );

    app.post(
        "/project/edit/:id",
        upload.fields([
            {
                name: "image1",
                maxCount: 1,
            },
            {
                name: "image2",
                maxCount: 1,
            },
            {
                name: "image3",
                maxCount: 1,
            },
        ]),
        (req, res) => {
            if (req.session.loggedin) {
                const id = req.params.id;
                const title = req.body.title;
                const content = req.body.content;
                const contentText = req.body.contentText;

                let options = {};

                if (req.files) {
                    if (req.files.image1) {
                        const ext = req.files.image1[0].originalname.split(".")[
                            req.files.image1[0].originalname.split(".").length -
                                1
                        ];
                        fs.copyFileSync(
                            req.files.image1[0].path,
                            "./images/" + id + "_1." + ext
                        );
                        fs.unlinkSync(req.files.image1[0].path);

                        options.image1 = id + "_1." + ext;
                    }

                    if (req.files.image2) {
                        const ext = req.files.image2[0].originalname.split(".")[
                            req.files.image2[0].originalname.split(".").length -
                                1
                        ];
                        fs.copyFileSync(
                            req.files.image2[0].path,
                            "./images/" + id + "_2." + ext
                        );
                        fs.unlinkSync(req.files.image2[0].path);

                        options.image2 = id + "_2." + ext;
                    }

                    if (req.files.image3) {
                        const ext = req.files.image3[0].originalname.split(".")[
                            req.files.image3[0].originalname.split(".").length -
                                1
                        ];
                        fs.copyFileSync(
                            req.files.image3[0].path,
                            "./images/" + id + "_3." + ext
                        );
                        fs.unlinkSync(req.files.image3[0].path);

                        options.image3 = id + "_3." + ext;
                    }
                }

                if (id && title && contentText && content) {
                    options.id = id;
                    options.title = title;
                    options.contentText = contentText;
                    options.content = content;

                    console.log(options);

                    db.Projects.update(options, {
                        where: {
                            id: id,
                        },
                    }).then(() => {
                        res.redirect("/admin/project");
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
        }
    );

    app.post("/project/delete/:id", (req, res) => {
        if (req.session.loggedin) {
            const id = req.params.id;
            if (id) {
                db.Projects.findAll({
                    where: {
                        id: id,
                    },
                }).then((results) => {
                    if (results.length > 0) {
                        db.Projects.destroy({
                            where: {
                                id: id,
                            },
                        });
                        res.redirect("/admin/project");
                        fs.unlinkSync("./images/" + results[0].image1);
                        fs.unlinkSync("./images/" + results[0].image2);
                        fs.unlinkSync("./images/" + results[0].image3);
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

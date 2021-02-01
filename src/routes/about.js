const fs = require("fs");
const multer = require("multer");
const db = require("../../models");

module.exports = (app, globalConfig) => {
    const upload = multer({ dest: "./uploads" });

    app.get("/about", (req, res) => {
        db.About.findAll().then((results) => {
            if (results.length > 0) {
                db.Settings.findAll().then((settings) => {
                    siteSettings = settings[0].dataValues;
                    res.render("about", {
                        global: globalConfig,
                        settings: siteSettings,
                        postData: results[0].dataValues,
                    });
                });
            } else {
                res.render("error", {
                    title: "Page not found",
                    message: "Page not found or removed",
                });
            }
        });
    });

    app.post(
        "/about/edit",
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
                            "./images/aboutImage1." + ext
                        );
                        fs.unlinkSync(req.files.image1[0].path);

                        options.image1 = "/img/aboutImage1." + ext;
                    }

                    if (req.files.image2) {
                        const ext = req.files.image2[0].originalname.split(".")[
                            req.files.image2[0].originalname.split(".").length -
                                1
                        ];
                        fs.copyFileSync(
                            req.files.image2[0].path,
                            "./images/aboutImage2." + ext
                        );
                        fs.unlinkSync(req.files.image2[0].path);

                        options.image1 = "/img/aboutImage2." + ext;
                    }
                }

                if (req.files.image3) {
                    const ext = req.files.image3[0].originalname.split(".")[
                        req.files.image3[0].originalname.split(".").length - 1
                    ];
                    fs.copyFileSync(
                        req.files.image3[0].path,
                        "./images/aboutImage3." + ext
                    );
                    fs.unlinkSync(req.files.image3[0].path);

                    options.image3 = "/img/aboutImage3." + ext;
                }

                if (content && contentText) {
                    options.content = content;
                    options.contentText = contentText;

                    db.About.update(options, {
                        where: {
                            id: 1,
                        },
                    }).then(() => {
                        res.redirect("/admin/about");
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
        }
    );
};

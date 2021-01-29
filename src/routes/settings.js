const fs = require("fs");
const multer = require("multer");

const db = require("../../models");

module.exports = (app, globalConfig) => {
    const upload = multer({ dest: "./uploads" });

    app.post("/settings/edit", upload.fields([{
        name: 'siteimage', maxCount: 1
        }, {
        name: 'siteicon', maxCount: 1
    }]), (req, res) => {
        if (req.session.loggedin) {
            const siteName = req.body.sitename;
            const siteDescription = req.body.sitedescription;
            let options = {};

            if (req.files) {
                if (req.files.siteimage) {
                    const ext = req.files.siteimage[0].originalname.split(".")[
                        req.files.siteimage[0].originalname.split(".").length - 1
                    ];
                    fs.copyFileSync(req.files.siteimage[0].path, "./images/siteImage." + ext);
                    fs.unlinkSync(req.files.siteimage[0].path);
                    
                    options.siteImage = "/img/siteImage." + ext
                }

                if (req.files.siteicon) {
                    const ext = req.files.siteicon[0].originalname.split(".")[
                        req.files.siteicon[0].originalname.split(".").length - 1
                    ];
                    fs.copyFileSync(req.files.siteicon[0].path, "./images/siteIcon." + ext);
                    fs.unlinkSync(req.files.siteicon[0].path);
                    
                    options.siteIcon = "/img/siteIcon." + ext
                }
            }

            if (siteName && siteDescription) {
                options.siteName = siteName;
                options.siteDescription = siteDescription;

                db.Settings.update(options, {
                    where: {
                        id: 1
                    }
                }).then(() => {
                    res.redirect("/admin/settings");
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

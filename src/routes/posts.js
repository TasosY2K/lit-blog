const slug = require("speakingurl");

const db = require("../../models");
const gen = require("../../utility/generator.js");

module.exports = (app, globalConfig) => {
    app.get("/post/all", (req, res) => {
        db.Posts.findAll().then((results) => {
            if (results.length > 0) {
                res.render("allPosts", {
                    global: globalConfig,
                    username: req.session.username,
                    postData: results,
                });
            } else {
                res.render("allPosts", {
                    global: globalConfig,
                    username: req.session.username,
                });
            }
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

    app.post("/post/create", (req, res) => {
        if (req.session.loggedin) {
            const title = req.body.title;
            const content = req.body.content;
            const author = req.session.username;
            if (title && content) {
                db.Posts.create({
                    id: gen.id(),
                    title: title,
                    url: slug(title),
                    author: author,
                    content: content,
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

    app.post("/post/edit/:id", (req, res) => {
        if (req.session.loggedin) {
            const id = req.params.id;
            const title = req.body.title;
            const url = req.body.url;
            const content = req.body.content;
            if (id && title && content) {
                db.Posts.update({
                    title: title,
                    url: url,
                    content: content
                },{
                    where: {
                        id: id
                    }
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
                db.Posts.destroy({
                    where: {
                        id: id
                    }
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
};

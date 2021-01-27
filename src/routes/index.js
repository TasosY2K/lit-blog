module.exports = (app, globalConfig) => {
    app.get("/", (req, res) => {
        res.render("index");
    });
};

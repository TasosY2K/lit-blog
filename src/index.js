require("dotenv").config();

const session = require("express-session");
const bodyParser = require("body-parser");

const express = require("express");
const app = express();
const port = process.env.WEB_PORT;

const filewalker = require("../utility/fileWalker.js");
const gen = require("../utility/generator.js");

let globalConfig = process.env;

app.use(
    session({
        secret: gen.id(),
        resave: true,
        saveUninitialized: true,
    })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/img", express.static(`./images`));

app.set("json spaces", 2);
app.set("view engine", "pug");

console.log("Lit Blog 🔥 " + globalConfig.APP_VERSION);

(async () => {
    const routes = await filewalker.walk(__dirname + "/routes/");

    routes.forEach((route) => {
        const time = new Date().getMilliseconds();
        require(route.path)(app, globalConfig);
        console.log(
            `Loaded ${route.name} in ${new Date().getMilliseconds() - time}ms`
        );
    });

    app.get("*", (req, res) => {
        res.sendStatus(404);
    });
})();

app.listen(port, () =>
    console.log(`Server started at http://127.0.0.1:${port}`)
);

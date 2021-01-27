const bcrypt = require("bcryptjs");
const gen = require("../utility/generator.js");
const db = require("../models");

const username = gen.username();
const password = gen.password();
const hash = bcrypt.hashSync(password);

db.Users.create({
    id: gen.id(),
    username: username,
    hash: hash,
}).then(() => {
    console.log(`Account created ${username}:${password}`);
    console.log("Don't forget to save this account");
});

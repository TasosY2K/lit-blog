const fs = require("fs");
const rimraf = require("rimraf");

const folders = ["uploads", "images"];

folders.forEach((folder) => {
    if (fs.existsSync(folder)) {
        rimraf(folder, () => {
            console.log(folder + " deleted");
        });
    }
});

const files = ["storage.db"];

files.forEach((file) => {
    if (fs.existsSync(file)) {
        fs.unlink(file, () => {
            console.log(file + " deleted");
        });
    }
});

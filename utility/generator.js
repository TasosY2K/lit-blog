const crypto = require("crypto");

exports.id = () => {
    return crypto.randomBytes(16).toString("hex");
};

exports.username = () => {
    let adjs = [
            "autumn",
            "hidden",
            "bitter",
            "misty",
            "silent",
            "empty",
            "dry",
            "dark",
            "summer",
            "icy",
            "delicate",
            "quiet",
            "white",
            "cool",
            "spring",
            "winter",
            "patient",
            "twilight",
            "dawn",
            "crimson",
            "wispy",
            "weathered",
            "blue",
            "billowing",
            "broken",
            "cold",
            "damp",
            "falling",
            "frosty",
            "green",
            "long",
            "late",
            "lingering",
            "bold",
            "little",
            "morning",
            "muddy",
            "old",
            "red",
            "rough",
            "still",
            "small",
            "sparkling",
            "throbbing",
            "shy",
            "wandering",
            "withered",
            "wild",
            "black",
            "young",
            "holy",
            "solitary",
            "fragrant",
            "aged",
            "snowy",
            "proud",
            "floral",
            "restless",
            "divine",
            "polished",
            "ancient",
            "purple",
            "lively",
            "nameless",
        ],
        nouns = [
            "waterfall",
            "river",
            "breeze",
            "moon",
            "rain",
            "wind",
            "sea",
            "morning",
            "snow",
            "lake",
            "sunset",
            "pine",
            "shadow",
            "leaf",
            "dawn",
            "glitter",
            "forest",
            "hill",
            "cloud",
            "meadow",
            "sun",
            "glade",
            "bird",
            "brook",
            "butterfly",
            "bush",
            "dew",
            "dust",
            "field",
            "fire",
            "flower",
            "firefly",
            "feather",
            "grass",
            "haze",
            "mountain",
            "night",
            "pond",
            "darkness",
            "snowflake",
            "silence",
            "sound",
            "sky",
            "shape",
            "surf",
            "thunder",
            "violet",
            "water",
            "wildflower",
            "wave",
            "water",
            "resonance",
            "sun",
            "wood",
            "dream",
            "cherry",
            "tree",
            "fog",
            "frost",
            "voice",
            "paper",
            "frog",
            "smoke",
            "star",
        ];

    let name1 = adjs[Math.floor(Math.random() * (adjs.length - 1))];
    let name2 = nouns[Math.floor(Math.random() * (nouns.length - 1))];
    return name1 + name2.charAt(0).toUpperCase() + name2.slice(1);
};

exports.password = () => {
    let length = 18 ? 18 : 10;
    let string = "abcdefghijklmnopqrstuvwxyz";
    let numeric = "0123456789";
    let punctuation = "!@#$%^&*()_+~`|}{[]:;?><,./-=";
    let password = "";
    let character = "";
    while (password.length < length) {
        entity1 = Math.ceil(string.length * Math.random() * Math.random());
        entity2 = Math.ceil(numeric.length * Math.random() * Math.random());
        entity3 = Math.ceil(punctuation.length * Math.random() * Math.random());
        hold = string.charAt(entity1);
        hold = password.length % 2 == 0 ? hold.toUpperCase() : hold;
        character += hold;
        character += numeric.charAt(entity2);
        character += punctuation.charAt(entity3);
        password = character;
    }
    password = password
        .split("")
        .sort(function () {
            return 0.5 - Math.random();
        })
        .join("");
    return password.substr(0, 18);
};

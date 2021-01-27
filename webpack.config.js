module.exports = {
    mode: "development",
    entry: "./static/index.js",
    output: {
        path: __dirname + "/views",
        filename: "bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
};

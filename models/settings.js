module.exports = (sequelize, Sequelize) => {
    const Settings = sequelize.define("post", {
        siteName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        siteDescription: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        siteImage: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        siteIcon: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    });
    return Settings;
};

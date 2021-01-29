module.exports = (sequelize, Sequelize) => {
    const Settings = sequelize.define("setting", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
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
        instagram: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        facebook: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    });
    return Settings;
};

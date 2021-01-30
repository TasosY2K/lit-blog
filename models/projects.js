module.exports = (sequelize, Sequelize) => {
    const Projects = sequelize.define("project", {
        id: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: false,
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        url: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        author: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        image1: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        image2: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        image3: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        content: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        contentText: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    });
    return Projects;
};

module.exports = (sequelize, Sequelize) => {
    const About = sequelize.define("about", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        content: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        contentText: {
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
    });
    return About;
};

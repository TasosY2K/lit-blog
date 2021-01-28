module.exports = (sequelize, Sequelize) => {
    const Posts = sequelize.define("post", {
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
        image: {
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
    return Posts;
};

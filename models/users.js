module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define("user", {
        id: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: false,
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        hash: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    });
    return Users;
};

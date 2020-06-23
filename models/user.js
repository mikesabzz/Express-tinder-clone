module.exports = (db, Sequelize) => {
    return db.define('user', {
        name: Sequelize.STRING,
        gender: Sequelize.STRING,
        gender_preference: Sequelize.STRING,
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
    })


} 

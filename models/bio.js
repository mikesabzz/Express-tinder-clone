module.exports = (db, Sequelize) => {
    return db.define('bio', {
        image: Sequelize.STRING,
        bio: Sequelize.TEXT,
        gender: Sequelize.STRING,
        gender_preference: Sequelize.STRING,
        location: Sequelize.STRING,
    })
} 

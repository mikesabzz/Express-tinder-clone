module.exports = (db, Sequelize) => {
    return db.define('bio', {
        image: Sequelize.TEXT,
        bio: Sequelize.TEXT,
        location: Sequelize.STRING,
    })
} 

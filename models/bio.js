module.exports = (db, Sequelize) => {
    return db.define('bio', {
        bio: Sequelize.TEXT,
    })
} 

const Sequelize = require('sequelize')
const UserModel = require('./user')
const BioModel = require('./bio')
const bcrypt = require('bcrypt')

const db = new Sequelize((process.env.DATABASE_URL || 'postgres://localhost:5432/bio_user'), {
  database: "bio_user",
  dialect: 'postgres',
  define: {
    underscored: true,
    returning: true
  }
})

const User = UserModel(db, Sequelize);

User.beforeCreate(async (user, options) => {

    const hashedPassword = await bcrypt.hash(
        user.password,
        Number(process.env.SALT_ROUNDS)
    )
    user.password = hashedPassword
});

const Bio = BioModel(db,Sequelize)
User.hasMany(Bio)
Bio.belongsTo(User)

module.exports = {
  db,
  User,
  Bio
}

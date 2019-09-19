const { User, Bio }  = require('../models/index')
const bcrypt = require('bcrypt')

const seedDb = async () => {
  try {
    await User.destroy({
      where: {}
    })

  
    const tom = await User.create({
      name: "Tom Brady",
      email: "tom@mail.com",
      password: 'password',
      demoUser: true
    })

    const leonardo = await User.create({
      name: "Leonardo DiCaprio",
      email: "leo@mail.com",
      password: 'password',
      demoUser: true
    });

    const margot = await User.create({
      name: "Margot Robbie",
      email: "margot@mail.com",
      password: 'password',
      demoUser: true
    });

    const angelina = await User.create({
        name: "Angelina Jolie",
        email: "angel@mail.com",
        password: 'password',
        demoUser: true
      });

    const bio1 = await Bio.create({
        bio: "Quarter back, New England Patriots, interests in females"
    })
    const bio2 = await Bio.create({
        bio: "Nominated for alot of awards, including Best American Actor"
    })
   
    const bio3 = await Bio.create({
        bio: "Austrailian Actor"
    })
    const bio4 = await Bio.create({
        bio: "American actress, filmmaker"
    })


    await bio1.setUser(tom)
    await bio2.setUser(leonardo)
    await bio3.setUser(margot)
    await bio4.setUser(angelina)

  } catch(e) {
    console.log(e);
  }
}

const run = async () => {
  try {
    await seedDb()
  } catch(e) {
    console.log(e)
  } finally {
    await process.exit()
  }
}

run()
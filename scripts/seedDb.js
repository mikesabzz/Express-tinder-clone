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
        image: "https://upload.wikimedia.org/wikipedia/commons/b/b2/Tom_Brady_2017.JPG",
        bio: "Quarter back, New England Patriots, interests in females",
        location: "Los Angelos"
    })
    const bio2 = await Bio.create({
        image: "https://timedotcom.files.wordpress.com/2014/10/455886166.jpg",
        bio: "Nominated for alot of awards, including Best American Actor",
        location: "San Diego"
    })
   
    const bio3 = await Bio.create({
        image: "https://upload.wikimedia.org/wikipedia/commons/9/98/Margot_Robbie_at_Somerset_House_in_2013_%28cropped%29.jpg",
        bio: "Austrailian Actor",
        location: "Texas"
    })
    const bio4 = await Bio.create({
        image: "https://upload.wikimedia.org/wikipedia/commons/a/ad/Angelina_Jolie_2_June_2014_%28cropped%29.jpg",
        bio: "American actress, filmmaker",
        location: "New York City"
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
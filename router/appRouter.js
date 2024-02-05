const express = require("express");
const appRouter = express.Router();
const { passport } = require("../auth/auth");
const { Bio, User } = require("../models");
const cloudinary = require("../cloudinary");
const multer = require("multer");

//upload image
// const storage = multer.diskStorage({
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '=' + file.originalname)
//   }
// })
// const upload = multer({ storage: storage })
// appRouter.get('/bio', async(req,res) => {
//   try {
//     await Bio.findAll()
//     .then((result) => res.json(result))
//   } catch(error) {
//     console.log(error)
//   }
// })
// appRouter.post('/upload', upload.single('file'), async (req, res) => {
//   const result = await cloudinary.uploads(req.file.path)
//   try {
//     await Bio.create({
//       image: result.url,
//       userId: req.body.userId,
//       bio: req.body.bio,
//       gender: req.body.gender,
//       gender_preference: req.body.gender_preference,
//       location: req.body.location,
//     })
//     .then(r => {
//       res.send(r.get({ plain: true }))
//     })
//   }
//   catch (error) {
//     console.log(error)
//   }
// })

appRouter.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const username = await User.findAll({
        where: {
          id: `${req.user.id}`,
        },
        include: [
          {
            model: Bio,
          },
        ],
      });
      res.json({ user: username, message: "authenticated" });
    } catch (e) {
      console.error(e);
    }
  }
);

appRouter.get("/bio", async (req, res) => {
  res.send(await Bio.findAll());
});

appRouter.get("/bio/:id", async (req, res) => {
  let bio = await Bio.findByPk(req.params.id);
  res.send(bio);
});

appRouter.get("/bio/users/demos", async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: Bio,
        },
      ],
    });
    res.send(users);
  } catch (error) {
    throw error;
  }
});

appRouter.get("/bio/gender/male", async (req, res) => {
  try {
    const males = await User.findAll({
      include: [
        {
          model: Bio,
          where: { gender: "male" },
        },
      ],
    });
    res.send(males);
  } catch (error) {
    throw error;
  }
});

appRouter.get("/bio/gender/female", async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: Bio,
          where: { gender: "female" },
        },
      ],
    });
    res.send(users);
  } catch (error) {
    throw error;
  }
});

appRouter.post("/bio", async (req, res) => {
  try {
    const bio = await Bio.create(req.body);
    res.send(bio);
  } catch (e) {
    console.log(e);
  }
});

appRouter.put("/bios/user/:user_id/update/:bio_id", async (req, res) => {
  let bio = await Bio.findByPk(req.params.bio_id);

  await bio.update(req.body);
  res.send(bio);
});

appRouter.delete("/bio/:id/delete", async (req, res) => {
  try {
    const bio = await Bio.findByPk(req.params.id);
    if (bio) {
      await bio.destroy();

      console.log("My description: ", bio);
      res.send("ok");
    } else {
      let err = new Error("Bio Not Found");
      res.status(400).send(err.toString());
    }
  } catch (error) {
    throw error;
  }
});

module.exports = appRouter;

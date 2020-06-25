const cloudinary = require('cloudinary')
const dotenv = require('dotenv')
dotenv.config()

cloudinary.config({
    cloud_name: process.env.Cloud_Name,
    api_key: process.env.Cloudinary_API_KEY,
    api_secret: process.env.Cloudinary_API_SECRET
})

exports.uploads = (file, folder) => {
    return new Promise(resolve => {
        cloudinary.uploader.upload(file, (result) => {
            resolve({
                image: result.image,
                id: result.public_id,
                bio: result.public_bio,
                gender: result.public_gender,
                gender_preference: result.public_gender_preference,
                location: result.public_location
            })
        }, {
            resource_type: "auto",
            folder: folder
        })
    })
}
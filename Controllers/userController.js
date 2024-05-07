

const users = require("../model/userSchema");

//import jsonwebtoken
const jwt = require('jsonwebtoken')

//logic for registration
exports.register = async (req, res) => {
    console.log(req.body);
    const { username, email, password } = req.body

    try {
        const existingUser = await users.findOne({ mailId: email })

        if (existingUser) {
            res.status(406).json('user already exists')
        }
        else {
            const newUser = new users({
                username,
                mailId: email,
                password,
                profile: "",
                linkdin: "",
                github: ""


            })
            //store the particular data in mongoDB mongoose method
            await newUser.save()
            res.status(200).json(newUser)
        }
    } catch (error) {
        res.status(401).json('registration failed due to', error)
    }

}

//logic for login

exports.login = async (req, res) => {


    const { email, password } = req.body

    const existingUser = await users.findOne({ mailId: email, password })

    try {
        if (existingUser) {

            //genrerating token using sign() method

            const token = jwt.sign({ userId: existingUser._id }, "confidential123")


            res.status(200).json({ existingUser, token })

        }
        else {
            res.status(405).json("incorrect email Id or password")
        }
    } catch (error) {
        res.status(401).josn('login request failed due to', error)
    }

}

//for adding profile

exports.updateProfile = async (req, res) => {
    const userId = req.payload
    console.log(userId);



    const { username,email, password, github, linkdin, profile } = req.body
    console.log(username,email, password, github, linkdin, profile);


    const profilePhoto = req.file? req.file.filename : profile
    console.log(profilePhoto);


    try {
        const updateProfile =await users.findByIdAndUpdate(
            { _id:userId },
            {
                username,
                mailId: email,
                password,
                profile: profilePhoto,
                linkdin,
                github
            },
            { new: true }

        )

        await updateProfile.save()

        res.status(200).json(updateProfile)


    } catch (error) {
       // res.status(401).json(`request failed due to ${error}`)
       console.log(error.response.data);
    }


}
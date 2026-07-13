const User = require("../models/user.mode")
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userController = {
    newUser: async (req, res) => {
        try {
            const { firstName, lastName, email, password } = req.body
            if (!firstName || !lastName || !email || !password) {
                return res.status(400).send({ error: "All fields are required." })
            }

            let dublicateEmail = await User.findOne({ email })
            if (dublicateEmail) {
                return res.status(400).send({
                    message: "Email already exists"
                })
            }

            let newUser = new User({ firstName, lastName, email, password })
            const secretKey = process.env.SECRET_KEY

            const token = jwt.sign({ id: newUser._id }, secretKey)
            res.cookie("access_token", `Bearer ${token}`, {
                httpOnly: true,
                maxAge: 2 * 24 * 60 * 60 * 1000
            })

            newUser.tokens.push(token)
            await newUser.save()
            res.status(201).send({ message: "account created successfully" })

        } catch (e) {
            res.status(500).send({ message: e.message })
        }
    },

    loginUser: async (req, res) => {
        try {
            const { email, password } = req.body
            if (!email || !password) {
                return res.status(400).send({ error: "Email and password are required." })
            }

            const user = await User.findOne({ email })
            if (!user) {
                return res.status(401).send({ message: "Invalid email or password" })
            }

            const match = await bcryptjs.compare(password, user.password)
            if (!match) {
                return res.status(401).send({ message: "Invalid email or password" })
            }

            const secretKey = process.env.SECRET_KEY
            const token = jwt.sign({ id: user._id }, secretKey)

            res.cookie("access_token", `Bearer ${token}`, {
                httpOnly: true,
                maxAge: 2 * 24 * 60 * 60 * 1000
            })

            user.tokens.push(token)
            user.save()

            res.status(200).send({
                message: "logged in successfully",
                access_token: token
            })

        } catch (error) {
            res.status(500).send({ message: error.message })
        }
    },

    logout: async (req, res) => {

        try {
            const token = req.cookies.access_token.split(" ")[1];

            const user = await User.findById(req.user._id)


            if (!user) {
                return res.status(400).send({ message: "user not found " })
            }

            user.tokens = user.tokens.filter(t => t !== token)
            await user.save()

            res.clearCookie("access_token")
            
            res.status(200).send({ message: " logged out successfully" })

        } catch (error) {
            res.status(500).send({ message: error.message })

        }


    }
}

module.exports = userController
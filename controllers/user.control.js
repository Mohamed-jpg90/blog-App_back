const User = require('../models/user.mode')
// const  logger
const bcryptjs = require('bcryptjs')

const userControler = {
    deleteUser: async (req, res) => {
        try {
            let { id } = req.params
            await User.findByIdAndDelete(id)

            res.send({
                message: "Accout is delted "
            })

        } catch (error) {
            res.status(500).send({
                message: error.message
            })
        }
    },
    updateUser: async (req, res) => {
        try {
            const updateData = {
                ...req.body
            }
            if (req.file) {
                updateData.image = `/api/user/${req.file.filename}`;
            }
            console.log(req.body);
            console.log(req.file);
            console.log(updateData);
            let user = await User.findByIdAndUpdate(req.user._id, updateData, { new: true })

            if (!user) {
                return res.status(404).send({
                    message: "User not found"
                });
            }

            res.send({
                message: "User updated successfully",
                user
            });


        } catch (error) {
            res.status(500).send({
                message: error.message
            })
        }
    },
    updatePassword: async (req, res) => {
        try {
            const { lastPass, newPass } = req.body
            if (!lastPass || !newPass) {
                return res.status(400).send({
                    message: "All fields are required"
                });
            }

            const user = await User.findById(req.user._id);

            if (!user) {
                return res.status(404).send({
                    message: "User not found"
                });
            }

            const match = await bcryptjs.compare(lastPass, user.password);

            if (!match) {
                return res.status(400).send({
                    message: "The last password is not correct"
                });
            }


            console.log("Old:", user.password);
            console.log("New:", newPass);

            user.password = newPass;

            await user.save();

            return res.send({
                message: "Password updated successfully"
            });

        } catch (error) {
            res.status(500).send({
                message: error.message
            })
        }
    },
    getUser : async (req,res)=>{
        try {
            let user  = await User.findById(req.user._id)
            if(!user){
              return res.status(400).send({message:"user not found"})  
            }
            res.send(user)
        } catch (error) {
                res.status(500).send({
                message: error.message
            })
        }
    }
}

module.exports = userControler
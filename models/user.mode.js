const mongoose = require("mongoose")
const schema = mongoose.Schema
const bcryptjs = require("bcryptjs")


const userSchema = new schema({
    firstName: {
        required: true,
        type: String,
        trim: true
    },
    lastName: {
        required: true,
        type: String,
        trim: true
    },
    email: {
        required: true,
        type: String,
        trim: true,
        unique: true
    },

    password: {
        required: true,
        type: String,
        trim: true
    },

    isAdmin: {
        type: Boolean,
        default: false
    },
    tokens: [{
        type: String,
        expires: "2d",
        trim: true
    }],
    image :{
        type : String,
        trim : true
    }
})


userSchema.pre("save", async function () {
    try {
        if (!this.isModified("password")) {
            return;
        }

        this.password = await bcryptjs.hash(this.password, 8);
    } catch (err) {
        throw err;
    }
});

const User = mongoose.model("user", userSchema)

module.exports = User 
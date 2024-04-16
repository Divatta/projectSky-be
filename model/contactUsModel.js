const mongoose = require('mongoose')

const contactusSchema = new mongoose.Schema({
    userName:{
        type: String,
        trim: true
    },
    email:{
        type: String,
        trim: true,
        unique: [true, "email already exists."]
    },
    phone:{
        type: String,
        trim: true,
        unique: [true, "mobile already exists."]
    },
    message:{
        type: Array,
        default: []
    }
},{
    collection: 'contactWithUs',
    timestamps: true
})

module.exports = mongoose.model("ContactUs", contactusSchema)
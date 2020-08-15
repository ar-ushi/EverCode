const mongoose = require("mongoose")
const schema = mongoose.Schema

const requiredString = {
    type : String,
    required: true
}

//? Creating Schema
const notes = new schema({
    title : requiredString,
    content : requiredString,
    image : {
        type : String
    },
    userCreator : {
        type : schema.Types.ObjectId,
        ref : "User"
    }
})


module.exports = mongoose.model("Notes", notes)
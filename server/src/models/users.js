const mongoose = require("mongoose")
const schema = mongoose.Schema

const requiredString = {
    type : String,
    required: true
}

//? Creating Schema
const users = new schema({
    username: requiredString,
    email : requiredString,
    password : requiredString,
    createdNotes : [{
        type: schema.Types.ObjectId,
        ref: 'Notes'
    }] //one user to many note id relation 
})


module.exports = mongoose.model("Users", users)
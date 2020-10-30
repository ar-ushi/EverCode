const note = require('../models/notes')
const User = require('../models/users')

const getUser = async(userid) => {
try {
    const userId = await User.findById(userid)
    if (userId) return {...userId._doc,createdNotes: getNotes(User._doc.createdNotes)}
} catch (error) {
    throw error
}
}
//getting creatednotes array that match the userid 
const getNotes = async(noteid) => {
    try {
        const notesId = await note.find({_id : {$in : noteid}})
        return notesId.map(Note => {
            return {...Note._doc,}
        }) //returning note that matches
    } catch (error) {
        throw err
    }
}
module.exports = {
    //array of all notes
   notes : async() =>{
       try {
           const allNotes = await note.find({})
           return allNotes.map(Note =>{
               return {
                   ...note._doc,userCreator: getUser(note._doc.userCreator) //only calls usercreator if you query for it 
               }
           })
       } catch (error) {
           throw error
       }
   },
    //find note functionality
    Note: async() => {

    },
    //delete a Note
    deleteNote: async() => {

    },
    //create a note
    createNote: async({input}) => {
        const Note = new note({
            title: input.title,
            content: input.content,
            image: input.image,
        }) //need to include the user creator to link this note to one user
        let notes;
        try {
            const result = await Note.save() //saved document
            const findUser = getUser(userCreator)
            if (!findUser) return new Error('User not found')
            findUser.createdNotes.push(Note)
            notes = {
                ...result._doc
                // The spread syntax allows an expression to be expanded in places where multiple arguments are expected.
            }
            await findUser.save();
            return notes
        } catch (error) {
            throw error
        }
    },

}


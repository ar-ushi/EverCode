const note = require('../models/notes')
const User = require('../models/users')

const getUser = async(userid) => {
try {
    const userId = await User.findById(userid)
    if (userId) return {...userId._doc, createdNotes: getNotes(userId._doc.createdNotes)}
} catch (error) {
    throw error
}
}
//getting creatednotes array that match the userid 
const getNotes = async(noteid) => {
    try {
        const notesId = await note.find({_id : {$in : noteid}}) // basically, an  id that matches an array of id that have the id we pass in 
        return notesId.map(Note => {
             return {...Note._doc}
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
                   ...Note._doc,userCreator: getUser(Note._doc.userCreator) //only calls usercreator if you query for it 
               }
           })
       } catch (error) {
           throw error
       }
   },
    //find note functionality
    Note: async ({
        _id
    }) => {
        try {
            const oneNote = await note.findById({
                _id: _id
            })
            return oneNote._doc
        } catch (error) {
            throw error
        }
    },
    //delete a Note
    deleteNote: async() => {

    },
    updateNote: async() =>{

    },
    //create a note
    createNote: async({input}) => {
        const Note = new note({
            title: input.title,
            content: input.content,
            image: input.image,
            userCreator: '5f3967f1961b206b40a991d5',
        }) //need t o include the user creator to link this note to one user
        let notes;
        try {
            const result = await Note.save() //saved document
            notes = {
                ...result._doc,
                userCreator: getUser(result._doc.userCreator)
                // The spread syntax allows an expression to be expanded in places where multiple arguments are expected.
            }
            const findUser = User.findById('5f3967f1961b206b40a991d5')
            if (!findUser) return new Error('User not found')
            findUser.createdNotes.push(Note)
            await findUser.save();
            return notes
        } catch (error) {
            throw error
        }
    },

}


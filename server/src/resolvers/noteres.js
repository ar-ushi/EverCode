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
    deleteNote: async ({
        _id
    }, req) => {
        if (!req.authUser){ //doesn't find header in req
        throw new Error("Not Authorized to delete Note")
        } 
        try {
            const delNote = await note.findByIdAndDelete({
                _id: _id
            })
            return delNote
        } catch (error) {
            throw error
        }
    },
    updateNote: async ({_id, title, content, image}, req) => {
        if (!req.authUser){ //doesn't find header in req
        throw new Error("Not Authorized to update Note")
        } 
        try{
            const mynote =  await note.findById({
                _id: _id
            })
            if (!mynote){
                throw new Error(`Couldn't find user with id ${_id}`);
            }
            if (title !== undefined){
                mynote.title = title;
            }
            if (content !== undefined){
                mynote.content = content;
            }
            if (image !== undefined){
                mynote.image = image;
            }
            try{
                const result = await mynote.save()
                res = {
                    ...result._doc
                }
                return res
            }catch(error){
                throw error
            }
        }catch (error) {
            throw error
        }
    },
    //create a note
    createNote: async({input}, req) => {
        if (!req.authUser){ //doesn't find header in req
        throw new Error("Not Authorized to create a Note")
        } 
        const Note = new note({
            title: input.title,
            content: input.content,
            image: input.image,
            userCreator: req.userId
        }) //need t o include the user creator to link this note to one user
        let notes;
        try {
            const result = await Note.save() //saved document
            notes = {
                ...result._doc,
                userCreator: getUser(result._doc.userCreator)
                // The spread syntax allows an expression to be expanded in places where multiple arguments are expected.
            }
            const findUser = User.findById(req.userId)
            if (!findUser) return new Error('User not found')
            findUser.createdNotes.push(Note)
            await findUser.save();
            return notes
        } catch (error) {
            throw error
        }
    },

}


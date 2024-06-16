const Note = require('../Models/notesModel')

// 1. Get all Notes
const fetchAllNotes = async (req,res)=>{
    const notes =  await Note.find({})
    res.json(notes)
}
// 2. Post New Note
const postNewNote = async (req,res)=>{
    
    1. // Recieve Data for Storing into Database from Body
    const note = {
        title: req.body.title,
        body: req.body.body
    }

    // 2. Use Mongoose command to store data into MongoDB

    // mongoose command to store the data in DB
    // Command --> model.create(object)
       await Note.create(note)

    // 3. Respond back to user
    res.json({message:"New Note Created", note:note})
}

// 3. Update a Note
const updateNote = async(req,res)=>{
    // 1. Get the note you want to update
    const noteID = req.params.id

    // 2. get the data off from the body
    const updatedNote = {
        title: req.body.title,
        body: req.body.body
    }

    // 3. Update data in the database based on ID
    await Note.findByIdAndUpdate(noteID, updatedNote)

    // 4. Respond back to client
    res.status(200).json({message: "Note Updated", note:updatedNote})
}

// 4. Delete a Note
const deleteNote = async (req,res)=>{
   // 1. Get the note you want to update
   const noteID = req.params.id

    //2. Based on Id from parameter, we will use Mongoose command to delete the data in the database
    const note = await Note.findByIdAndDelete(noteID)

    //3. Respond back to client
    res.status(200).json({message:"Note Deleted", note:note})
}


// 5. Fetch a Single Note
const fetchANote = async (req,res)=>{
     // 1. Get the note you want to update
   const noteID = req.params.id

   //2. Based on Id from parameter, we will use Mongoose command to fetch a Single Record from the database
   const note = await Note.findById(noteID)
   
   //3. Respond back to client
   res.status(200).json(note)
}

module.exports = {
                    fetchAllNotes,
                    postNewNote, 
                    updateNote, 
                    deleteNote,
                    fetchANote
}
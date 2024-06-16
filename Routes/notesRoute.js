const express = require('express')
const router = express.Router()
const {fetchAllNotes, postNewNote, updateNote, deleteNote, fetchANote} = require('../Controller/noteController')


// 1. GET Method
router.get('/', fetchAllNotes)

// 2. POST Method
router.post('/', postNewNote)

// 3. PUT Method
router.put('/:id', updateNote)

// 4. Delete Method
router.delete('/:id', deleteNote)

// 5. Fetch a Single Note
router.get('/:id', fetchANote)



module.exports = router
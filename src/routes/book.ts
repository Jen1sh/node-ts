import express from 'express'
import {destroy, getAllBooks, store, update} from '../controllers/book'

const upload = require('multer')()

const router = express.Router()
 
router.post('/books', upload.any(), store)
router.get('/books',  getAllBooks)
router.delete('/books/:_id', destroy)
router.put('/books/:_id', upload.any(), update)

export = router;
import express from 'express'
import { login, register } from '../controllers/auth'

const upload = require('multer')()
const router = express.Router()

router.post('/register', upload.any(), register)
router.post('/login', upload.any(), login)

export = router;
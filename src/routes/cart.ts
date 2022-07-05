import express from 'express'
import { index } from '../controllers/cart'
import { authorizeUser } from '../middleware/auth'

const upload = require('multer')()

const router = express.Router()

router.get('/cart', index)

export = router;
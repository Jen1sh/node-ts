import http from 'http'
import express from 'express'
import bodyParser from 'body-parser'
import logging from './config/logging'
import config from './config/config'

import bookRoutes from './routes/book'
import authRoutes from './routes/user'
import cartRoutes from './routes/cart'

import mongoose from 'mongoose'

const NAMESPACE = 'Server';
const router = express()


//conect
mongoose.connect('mongodb://localhost:27017/nodets', config.mongo.options)
.then((result) => {
    logging.info(NAMESPACE, 'Connected to mongoose')
})
.catch((err) => {
    logging.error(NAMESPACE, err.message, err)
})

//logging

router.use((req, res, next) => {
    logging.info(NAMESPACE, `METHOD - [${req.method}], URL [${req.url}] IP - [${req.socket.remoteAddress}]`)

    res.on('finish', () => {
        logging.info(NAMESPACE, `METHOD - [${req.method}], URL [${req.url}] IP - [${req.socket.remoteAddress}] STATUS - [${res.statusCode}]`)
    })

    next();
})

router.use(bodyParser.urlencoded({extended: false}))
router.use(bodyParser.json())

//api rules
router.use((req, res, next) => {
    res.header('Acess-Control-Allow-Origin', '*');
    res.header('Acess-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')

    if(req.method == 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST PUT');
        return res.status(200).json({});
    
    }
    next()


})


//routes
router.use(authRoutes);
router.use(bookRoutes);
router.use(cartRoutes);


//error handling
router.use((req, res, next) => {
    const error = new Error('not found');

    return res.status(404).json({
        message: error.message
    })
   
})



const httpServer = http.createServer(router);

httpServer.listen(config.server.port, () => logging.info(NAMESPACE, `Server running on ${config.server.hostname} 
: ${config.server.port}`));
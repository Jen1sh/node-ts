import {Request, Response, NextFunction, response} from 'express'
import mongoose from 'mongoose'
import User from '../models/user'
import bcrypt from 'bcrypt'

import jwt from 'jsonwebtoken'

const key = 'my-app-token'

export const register = async (req: Request, res: Response, next: NextFunction) => {
    let {first_name, last_name, username, password} = req.body

    bcrypt.hash(password, 10, (err, hash) => {
        const user = new User({
            _id: new mongoose.Types.ObjectId,
            first_name: first_name.trim(),
            last_name: last_name.trim(),
            username: username.trim(),
            password: hash
        })

        user.save()
        .then(result => {
            return res.status(200).json({
                user: result,
                success: true
            })
        })
        .catch(err => {
            return res.status(500).json({
                message: err.message,
                err,
                success: false
            })
        })
    })
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
    const {username, password} = req.body

    User.findOne({username})
    .then(async data => {
        if(!data){
            return res.status(401).json({
                message: 'Invalid credentials',
                success: false
            })
        }

        const match = await bcrypt.compare(password, data.password)

        if(!match){
            return res.status(401).json({
                message: 'Invalid credentials',
                success: false
            })
        }

      //  const token = generate

      const token = jwt.sign({data: data}, key, {expiresIn: '24h'})

        return res.status(200).json({
            user: {_id: data._id, first_name: data.first_name, last_name: data.last_name},
            success: true,
            token
        })

    })
    .catch(err => {
        return res.json(500).json({
            message: 'No user found'
        })
    })
}
import jwt from 'jsonwebtoken';
import {Response, NextFunction, Request} from 'express'
import {AuthUserRequest} from '../interfaces/auth';

const key = 'my-app-token'

export const authorizeUser = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization

    if(!token){
        return res.status(401).json({
            'message': 'Unauthorized'
        })
    }

    const data = jwt.verify(token.split(' ')[1], key)

    return res.status(200).json({
        data: data
    })
}
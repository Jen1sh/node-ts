import {Request, Response, NextFunction} from 'express'
import mongoose from 'mongoose'

export const index = (req: Request, res: Response, next: NextFunction) => {

    return res.status(200).json({
        'message': 'cart'
    })
}
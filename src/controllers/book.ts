import {Request, Response, NextFunction, response} from 'express'
import mongoose from 'mongoose'
import logging from '../config/logging'
import Book from '../models/book'

const NAMESPACE = 'Sample Controller'

export const store = async (req: Request, res: Response, next: NextFunction) => {

    console.log('post', req.body)

    let {author, title} = req.body

    const book = new Book({
        _id: new mongoose.Types.ObjectId(),
        author: author.trim(),
        title: title.trim()
    })

     book.save()
    .then(result => {
        return res.status(200).json({
            book: result
        })
    })
    .catch(err => {
        return res.status(500).json({
            message: err.message,
            err
        })
    })
}

export const getAllBooks = async (req: Request, res: Response, next: NextFunction) => {
    Book.find()
    .exec()
    .then(result => {
        return res.status(200).json({
            books: result,
            count: result.length
        })
    })
    .catch(err => {
        return res.status(500).json({
            message: err.message,
            err
        })
    })
}

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
    Book.findByIdAndDelete(req.params._id)
    .then(result => {
        return res.status(200).json({
            message: 'Deleted',
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

}

export const update = async (req: Request, res: Response, next: NextFunction) => {
    
    const {title, author} = req.body

    const body = {title, author}

    Book.findByIdAndUpdate(req.params._id, body)
    .then(async results => {

        const book = await Book.findOne({_id: req.params._id})

        return res.status(200).json({
            success: true,
            book: book
        })
    })
    .catch(err => {
        return res.status(500).json({
            message: err.message,
            err,
            success: false
        })
    })
}

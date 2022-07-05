import {Document} from 'mongoose'

export default interface Cart extends Document{
    user_id: string;
    book_id: string;
}
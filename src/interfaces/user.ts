import {Document} from 'mongoose'

export default interface User extends Document{
    first_name: string;
    last_name: string;
    username: string;
    password: string;
}
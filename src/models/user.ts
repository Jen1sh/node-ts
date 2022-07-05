import mongoose, { Schema } from "mongoose";
import IUser from '../interfaces/user'

const UserSchema: Schema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
},
{
    timestamps: true
}
)

export default mongoose.model<IUser>('User', UserSchema);
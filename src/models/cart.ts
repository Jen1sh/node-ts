import mongoose, { Schema } from "mongoose";
import ICart from '../interfaces/cart'

const CartSchema: Schema = new Schema({
    user_id: {type: mongoose.Types.ObjectId, ref: "User"},
    book_id: {type: mongoose.Types.ObjectId, ref: 'Book'}
},
{
    timestamps: true
}
)

export default mongoose.model<ICart>('Cart', CartSchema);


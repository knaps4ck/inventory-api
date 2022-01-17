import mongoose, { Schema } from 'mongoose';
import joi, { number } from 'joi'
import IInventory from '../interfaces/inventory';

export const joiSchema = joi.object().keys({
    "name": joi.string().min(3).max(50).required(),
    "quantity": joi.number().min(1).required()
})

const InventorySchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        quantity: { type: Number, required: true }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IInventory>('Inventory', InventorySchema);

import mongoose, { Schema } from 'mongoose';
import Joi from 'joi'
import IInventory from '../interfaces/inventory';

export const joiSchemaAdd = Joi.object().keys({
    "name": Joi.string().min(3).max(50).required(),
    "quantity": Joi.number().min(1).required()
})

export const joiSchemaUpdate = Joi.object().keys({    
    "name": Joi.string().min(3).max(50).required(),
    "quantity": Joi.number().min(1).required()
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

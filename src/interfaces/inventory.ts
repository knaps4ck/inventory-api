import { Document } from 'mongoose';

export default interface IInventory extends Document {
    name: string;
    quantity: number;
}

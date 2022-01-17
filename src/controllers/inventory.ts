import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Inventory from '../models/inventory';
import { joiSchema } from '../models/inventory'

const addInventory = async (req: Request, res: Response, next: NextFunction) => {

    const {error, value} = await joiSchema.validate(req.body)
    
    if (error) {
        return res.status(400).json({
            message: error.details[0].message
        })
    }
    
    let { name, quantity } = req.body;
    const inventoryList = await Inventory.find()
    const filteredList = inventoryList.filter(item => item.name.toLowerCase() == name.toLowerCase())
    if (filteredList.length > 0) {
        req.params.itemId = filteredList[0]._id
        filteredList[0].quantity += req.body.quantity
        req.body = filteredList[0]
        req.body.duplicate = true
        return await updateInventory(req, res, next)             
    }

    const inventory = new Inventory({
        _id: new mongoose.Types.ObjectId(),
        name,
        quantity
    });
        

    return inventory
        .save()
        .then((result) => {
            return res.status(200).json({
                inventory: result
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
    });    
}

const getAllInventory = async (req: Request, res: Response, next: NextFunction) => {
    await Inventory.find()
        .exec()
        .then((inventory) => {
            return res.status(200).json({
                inventory: inventory,
                count: inventory.length
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
}

const getInventory = async (req: Request, res: Response, next: NextFunction) => {    
    await Inventory.find({"name": {$regex : `${req.params.searchText}`}})
        .exec()
        .then((inventory) => {
            return res.status(200).json({
                inventory: inventory,
                count: inventory.length
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
}

const deleteInventory = async (req: Request, res: Response, next: NextFunction) => {    
        await Inventory.findByIdAndRemove(req.params.itemId)
        .then(() => {      
            return res.status(200).json({
                message: "Inventory item successfully deleted!"
            })
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });           
}

const updateInventory = async (req: Request, res: Response, next: NextFunction) => {

    const {error, value} = await joiSchema.validate(req.body)
    
    if (error) {
        return res.status(400).json({
            message: error.details[0].message
        })
    }
    await Inventory.findByIdAndUpdate({_id: req.params.itemId}, req.body)
    .then(() => {      
        let message = "Inventory item successfully updated!" 
        if (req.body.duplicate != undefined) {
            message = 'DUPLICATE, ' + message
        }
        return res.status(200).json({
            message: message            
            
        })
    })
    .catch((error) => {
        return res.status(500).json({
            message: error.message,
            error
        });
    });      
}

export default { addInventory, deleteInventory, getAllInventory, getInventory, updateInventory};

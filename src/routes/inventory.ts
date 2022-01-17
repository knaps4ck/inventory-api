import express from 'express';
import controller from '../controllers/inventory';

const router = express.Router();

router.post('/create/inventory', controller.addInventory);
router.get('/get/inventory', controller.getAllInventory);
router.get('/get/inventory/:searchText', controller.getInventory)
router.delete('/delete/inventory/:itemId', controller.deleteInventory)
router.put('/update/inventory/:itemId', controller.updateInventory)

export = router;

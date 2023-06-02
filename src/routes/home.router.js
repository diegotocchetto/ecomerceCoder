import express from 'express';
export const router =express.Router();
import ProductManager from '../DAO/managers/ProductManager.js';
import { ProductService } from '../services/products.services.js';
const Service= new ProductService();
//const Service= new ProductManager("products.json");

router.get('/', async(req,res)=>{
    let products=await Service.getAll();

    return res.status(200).render("home", { products });
})


export default router;


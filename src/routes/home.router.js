import express from 'express';
export const router =express.Router();
import ProductManager from '../DAO/managers/ProductManager.js';

const ProducM= new ProductManager("./products.json");


router.get('/', async(req,res)=>{
    let products=await ProducM.getProducts();
    return res.status(200).render("home", { products });
})


export default router;


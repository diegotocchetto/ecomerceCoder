import express from 'express';
import ProductManager from '../DAO/managers/ProductManager.js';

export const realTimeRouter = express.Router();

const manager = new ProductManager("./products.json");


realTimeRouter.get('/realTimeProducts', async (req, res) => {
  const limit = req.query.limit
  const products = await manager.getProducts(limit)
  const data = {
      title: "PRODUCTS LIST",
      products
  }
  res.render('realTimeProducts', data)
})


export default realTimeRouter;
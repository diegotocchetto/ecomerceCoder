import express from 'express';
import {Router} from "express";
import ProductManager from '../DAO/managers/ProductManager.js';
export const productsRouter =express.Router();
const productMan = new ProductManager();
const manager = new ProductManager("./products.json");

import { ProductModel } from '../DAO/models/products.model.js';
import { ProductService } from '../services/products.services.js';



const Service = new ProductService();


productsRouter.get('/', async (req, res) => {
  try {
    const { limit } = req.query;
    const products = await Service.getAll(limit);
    return res.status(200).json({
      status: 'success',
      msg: 'products list',
      data: products,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: 'error',
      msg: 'something went wrong :(',
      data: {},
    });
  }
});

productsRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id)
    const products = await Service.getProductById(id);
    if(!products) 
    return res.status(404).json({
      status: 'error',
      msg: 'The product does not exist'});
  
    return res.status(200).json({
      status: 'success',
      msg: 'product',
      data: products,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: 'error',
      msg: 'something went wrong :(',
      data: {},
    });
  }
});



 /////HACIA MONGO agregar////
 productsRouter.post('/', async (req, res) => {
  try {
    const { title, description, price,code,stock ,category} = req.body;
    const productCreated = await Service.createOne(title, description, price,code,stock ,category);
    return res.status(201).json({
      status: 'success',
      msg: 'product created succesfully',
      data: productCreated,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: 'error',
      msg: 'something went wrong :(',
      data: {e},
    });
  }
});
///HACIA MONGO FIN///
 





//delete mongo
productsRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const productDeleted= await Service.deleteOne(id);
    console.log(productDeleted)
    return res.status(200).json({
      status: 'success',
      msg: 'product deleted',
      data: {},
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: 'error',
      msg: 'something went wrong :(',
      data: {},
    });
  }
});



productsRouter.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price,thumbnail,code,stock ,category,status } = req.body;
    const productUpdated= await Service.updateOne( {_id: id}, title, description, price,thumbnail,code,stock,category,status);
    return res.status(201).json({
      status: 'success',
      msg: 'product uptaded',
      data: {productUpdated},
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: 'error',
      msg: 'something went wrong :(',
      data: {e},
    });
  }
});


export default productsRouter;
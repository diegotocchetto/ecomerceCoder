import { Router } from "express";
import CartManager from "../DAO/managers/CartsManager.js";
import ProductManager from '../DAO/managers/ProductManager.js';

const routerCar = Router();
const cartsM = new CartManager("./carts.json");
const ProducM= new ProductManager("./products.json");
import { CartService } from '../services/carts.services.js';
import { ProductService } from '../services/products.services.js';

const ProdService= new ProductService();
const Service = new CartService();


//GET CART MONGO
routerCar.get('/:id', async (req, res) => {
    try {
      console.log("llega");
      const { id } = req.params;
      const carts = await Service.getCartById(id);
      return res.status(200).json({
        status: 'success',
        msg: 'cart',
        data: carts,
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



 /////ADD CART MONGO
 routerCar.post('/', async (req, res)=>{
    try {
         let cart = await Service.createCart()
        if (!cart){
            return res.status(400).send({status:'error',mensaje:"No se pudo crear carrito"})
        }
        res.status(200).send({status:'success', payload: cart})
    } catch (error) {
        console.log(error)
    }
})




//UPDATE CART MONGO
routerCar.put('/:cid/product/:pid', async (req, res)=>{
    const {cid, pid} = req.params
    console.log(pid)
  const product = await ProdService.getProductById(pid);
    console.log(product)
   
    if (!product) return res.status(400).send({status:'error',message:'El producto indicado no existe'})
   const quantity = req.body.quantity | 1 
    try {
        const response = await Service.updateCart(cid, pid, quantity) 
        if (response.status==="error"){
            return res.status(400).send(response)
        }else{
            return res.status(200).send(response)
        }       
    } catch (error) {
       console.log(error)
    }
})

export default routerCar;
import { CartModel } from '../DAO/models/carts.model.js';

export class CartService {



  async getCartById(_id) {
    console.log(_id)
    const cart = await CartModel.findOne({_id: _id });
    return cart;
  }




  
  async createCart() {
    try {
        // first verify if there is a cart for the user
        const cart= {
           // clientId: "",
            products: []
        }
        return await CartModel.create(cart)

    } catch (error) {
        return new Error(error)
    }
}



async updateCart(cid, pid, quantity) {
    try {
        const cart= await CartModel.findOne({_id: cid });
        console.log(cart)  
        if (!cart) return {status: "error", message: "Cart not found"}

        const productIndex = cart.products.findIndex(prod =>prod.product._id.toString()===pid)
        if (productIndex===-1){
            cart.products.push({product: pid, quantity}) //NO EXISTE
        } else {
            cart.products[productIndex].quantity+= quantity //YA EXISTE SUMO CANTIDAD
        }
        await cart.save();
        return {status: "success", message: "Product added succesfully", productsQty:cart.products.length }
    } catch (error) {
        return {status: 'error', message: error}
    }

}

}

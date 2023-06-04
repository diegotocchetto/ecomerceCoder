import { ProductModel } from '../DAO/models/products.model.js';

export class ProductService {
  
  validateProduct(title, description, price,code,stock,category) {
    if (!title || !description || !price || !code || !stock )
      console.log('validation error: Some field is missing, please check.');
      throw new Error('validation error: Some field is missing, please check.');
    }
  
  async getAll(limit) {
     const products = await ProductModel.find({}).limit(limit).lean().exec();
    return products;
  }


  async getProductById(_id) {
    console.log(_id)
    const product = await ProductModel.findOne({_id: _id });
    return product;
  }

  async createOne(title, description, price,code,stock,category) {

    const productCreated = await ProductModel.create({title, description, price,thumbnail:[],code,stock,category,status:true });
    return productCreated;
  }

  async deleteOne(_id) {
   const ProductToDelete= await ProductModel.findOne({_id: _id });
   if(!ProductToDelete)
   {
    throw new Error('product to delete does not exist.');
   }
    const deleted = await ProductModel.deleteOne({ _id: _id });
    return deleted;
  }

  async updateOne(_id, title, description, price,thumbnail,code,stock,category,status) {
    if (!_id) throw new Error('invalid _id');
    const productUptaded = await ProductModel.updateOne({ _id: _id }, { title, description, price,thumbnail,code,stock,category,status });
    return productUptaded;
  }
}
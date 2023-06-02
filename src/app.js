import express from 'express';
import productRouter from './routes/products.router.js';
import routerCar from './routes/carts.router.js';
import ProductManager from './DAO/managers/ProductManager.js';
import viewsRouter from './routes/home.router.js';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import { __dirname, connectMongo } from './utils.js';
import realTimeRouter from './routes/realTimeProducts.router.js';
import { ProductService } from './services/products.services.js';
const manager = new ProductManager("./products.json");
const Service = new ProductService();


const app = express();
const port=8080;
const httpServer =app.listen(port, () => {
    console.log("Conected to http://localhost:"+ port);
});

connectMongo();

const socketServer= new Server(httpServer);


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use('/static',express.static('./src/public'));
app.use('/api/carts', routerCar);
app.use('/api/products', productRouter);
app.use("/", realTimeRouter)

// Handlebars
app.engine("handlebars", handlebars.engine());
app.set("views",__dirname+ "/views");
app.set("view engine", "handlebars");
app.use(express.static(__dirname+'/public'));
app.use('/home',viewsRouter);


     socketServer.on('connection', async socket => {
    console.log('New client Connected', socket.id)



    socket.on('client:productDelete', async (pid, cid) => {
        const id = await Service.getProductById(pid.id)

        if(id.id!=undefined) {
               await Service.deleteOne(pid.id )
              const data = await Service.getAll();
               return socketServer.emit('newList', data)
        }else{
              const dataError = {status: "error", message: id}
              return socket.emit('newList', dataError)
        }
    })


    socket.on('client:newProduct', async data => {
        console.log(data.title, data.description, data.price,data.code,data.stock,data.category)
        const productAdd = await Service.createOne(data.title, data.description, data.price,data.code,data.stock,data.category);
        if(productAdd.status != 'error'){
            const newData = await Service.getAll();
            return  socketServer.emit('server:productAdd', newData);
        }else{
             const dataError = {status: "error", message: productAdd.message}
             return socket.emit('server:productAdd', dataError)   
    } 
    })
})





app.get("*"), (req, res, next) => {
    res.status(404).json({status: "error", msg: "Page you are loking Not Found", data: {} })
}
















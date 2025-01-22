import express from 'express';
import handlebars from 'express-handlebars'
import { Server } from 'socket.io';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import viewsRouter from './routes/views.router.js'
import { __dirname } from './utils.js';
import path from 'path';
import productManager from './managers/productManager.js';

// Express config
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use((req, res, next) => {
    console.log('Time:', Date.now());
    next();    
})
// Handlebars config
app.set('views', path.resolve(`${__dirname}/views`));
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');

// File statics
app.use (express.static(`${__dirname}/public`));
// Routes
app.use('/products', productsRouter);
app.use('/carts', cartsRouter);
app.use('/', viewsRouter);
// ERROR
app.use((err, req, res, next) =>{
    console.log(err);
    res.status(500).send('Error no controlado');    
});
// Server
const server = app.listen(8081, () => console.log('Server runnin on port 8081'));
// Socket
const io = new Server(server);
io.on('connection', async (socket) =>{
    console.log('nueva conexion:', socket.id);
        const productList = await productManager.getProducts();

    socket.on('client:new-entry', async (product) =>{
        console.log(JSON.stringify(product));
        await productManager.addProduct(product);
        console.log(product);
        
        socket.emit('server:productList', productList);
    })
    
    // socket.on('deleteProduct', async (id) => {              //Delete product comm
    //   console.log(JSON.stringify(id));
    //   await productManager.deleteProduct(id);
    //   products = await productManager.getProducts();
    // });
  
    
  });

app.set('socketio', io);

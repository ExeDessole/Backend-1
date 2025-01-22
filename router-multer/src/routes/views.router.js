import { Router } from "express";
import { __dirname } from '../utils.js';
import ProductManager from "../managers/productManager.js";

const router = Router();
const products = new ProductManager();

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = { name: 'Exe', role: 'user' };
    const singleProduct = await products.getProductByld(id);
  
    console.log(singleProduct);
    return res.status(200).render('home', { singleProduct, user });

  } catch (error) {
    next(error); // Pasa el error al siguiente middleware de manejo de errores
  }
});

router.get('/', async (req, res, next) => {
  try {
    const user = { name: 'Exe', role: 'user' };
    const productsList = await products.getProduct();
  
    console.log(productsList);
    return res.status(200).render('home', { productsList, user });

  } catch (error) {
    next(error); // Pasa el error al siguiente middleware de manejo de errores
  }
});
// Ruta para vista principal (productos)
router.get('/', async (req, res) => {
  const products = await productManager.getProducts();
  res.render('home', { productsList: products });
});

// Ruta para vista con WebSocket (realtimeproducts)
router.get('/realtimeproducts', async (req, res) => {
  const products = await productManager.getProducts();
  res.render('realtimeproducts', { productsList: products });
});

export default router;

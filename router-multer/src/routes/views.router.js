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
// Este codigo no me retorna el limite asignado
// router.get('/', async (req, res) =>{
//   try {
//     const limit = parseInt(req.query.limit);
//     console.log(limit);
    
//     const user = { name: 'Exe', role: 'user' };
//     const productsList = await products.getProduct();
  
//     if(!isNaN(limit)){  
//       console.log(productsList);
//       return res.status(200).render('home', {user, productsList});
//     }
//     return res.status(200).render('home', { user, products: productsList.slice(0, limit) });
//   } catch (error) {
//     res.status(401).send('download failed - products');
//   }
//   });

export default router;

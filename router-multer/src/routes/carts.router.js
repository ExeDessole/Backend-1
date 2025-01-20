import {Router} from 'express';
import CartManager from '../managers/cartManager.js';
import { __dirname } from '../utils.js';

const router = Router();
const path = `${__dirname}/files/carts.json`
const carts = new CartManager(path);

// POST crea un nuevo carrito, array inicializado con un array vacío.
router.post('/', async (req, res) => {
  const cart = {
      products: []
  }
  const result = await carts.addCart(cart)
  res.send({ status: 'success', result});

});

// GET retorna los productos dentro del carrito seleccionado mediante id.
router.get('/:id', async (req, res) => {
  const cartId = Number(req.params.id);
  const cart = await carts.getCartById(cartId);

  if (!cart) return res.status(400).send({ status: 'error', error: 'Carrito no encontrado'});
  res.send({ status: 'success', cart})
  console.log(cart);
  });
// POST agrega un nuesvo producto en el carrito sellecionado mediante id.
router.post('/:cid/product/:pid', async (req, res) =>{
  const cid = Number(req.params.cid);
  const cart = await carts.getCartById(cid);
  const product = req.body;

  
  if (!cart) {return res.status(400).send({ status: 'error', error: 'Carrito no encontrado'})}
  
  cart.products.push(product);
  res.send({ status: 'success', cart})
  console.log(cart);
})

export default router;
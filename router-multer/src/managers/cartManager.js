import fs from 'fs';

export default class CartManager{
  
  constructor (path){
      this.path = path;
  };

  getCart = async () =>{
    try {      
      if (fs.existsSync(this.path)){
        const data = await fs.promises.readFile(this.path, 'utf-8')        
        const dataJSON = JSON.parse(data);  
        return dataJSON;
      }else{
        return [];
      }  
    } catch (error) {
      console.log(error);
    }      
  };


  addCart = async (cart)=>{
    try {
      const carts = await this.getCart();
      
      if (carts.length === 0) {
        cart.id = 1;
      }else{
        cart.id = carts[carts.length - 1].id +1;
      }

      carts.push(cart);

      await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'));

      return cart;

    } catch (error) {
      console.log(error);
    } 

  };
  
  getCartByld = (id) =>{
    try {
      const carts = this.getCart();
      const checkCart = carts.findIndex(cart => cart.id === id);
    if (checkCart === -1){
      console.log('El carrito no existe')
    }else{
      const check = carts[checkCart]       
        return check;   
    }
    } catch (error) {
      console.log(error);
    }

  };

  deleteCart = (id) =>{
    const carts = this.getCart();
    const checkCart = carts.findIndex(cart => cart.id === id);
    
    if (checkCart === -1){
      console.log('El carrito no existe');
    }else{
      delete carts[checkCart];
      console.log('El carrito ha sido eliminado');
    }

  };
  
  };
  
 

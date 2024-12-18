import fs from 'fs';
import { __dirname } from '../utils.js';
import {v4 as uuid } from 'uuid';

export default class ProductManager{
  
  constructor (){
      this.path =  `${__dirname}/files/products.json`;
  };

  getProduct = async () =>{
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

  addProduct = async (product) => {
    try {
      const products = await this.getProduct();
      product.id = uuid();      
      products.push(product);
      await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
      return product;
    } catch (error) {
      console.log(error);
      throw error;
    } 
  };
  
  
  getProductByld = async (id) =>{
    try {
      const products = await this.getProduct();
      const checkProduct = products.find(product => product.id == id);

      if (!checkProduct) {
        console.log('El producto no existe');
      } else {
        return checkProduct;
      }
    } catch (error) {
      console.log(error);
      throw error;
    } 
  };
    
  // updateProduct = (id,newPrice) =>{

  //   const products = this.getProduct();
  //   const checkProduct = products.findIndex(product => product.id === id);

  //   const changePrice= products[checkProduct].price;

  //   if (changePrice === newPrice){
  //     console.log('El precio es igual al ingresado');
  //   }else{
  //     products[checkProduct].price = newPrice;
  //     return;
  //   };

  // };
  
  // deleteProduct = (id) =>{
  //   const products = this.getProduct();
  //   const checkProduct = products.findIndex(product => product.id === id);
    
  //   if (checkProduct === -1){
  //     console.log('El producto no existe');
  //   }else{
  //     delete products[checkProduct];
  //     console.log('El producto ha sido eliminado');
  //   }

  // };
  
};
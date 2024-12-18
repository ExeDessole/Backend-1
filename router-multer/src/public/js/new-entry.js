const form = document.querySelector('inputProduct'); 
form.addEventListener('submit', e => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const thumbnail = document.getElementById('thumbnail').value;
    const code = document.getElementById('code').value;
    const stock = document.getElementById('stock').value;

    if(!title || !description || !price || !thumbnail || !code || !stock) {
        alert('Todos los campos son obligatorios');
        return;
      }
    if(!/^https?:\/\//i.test(thumbnail)) {
    alert('La URL de la imagen no es válida');
    return;
    }
    if(isNaN(stock) || stock < 0) {
        alert('El stock debe ser un número mayor o igual a cero');
        return;
    }
    const newProduct = {
        title,
        description,
        price: parseFloat(price),
        thumbnail,
        code,
        stock: parseInt(stock)
      };
    
      socket.emit('client:new-entry', newProduct);
      form.reset();
      alert('El producto ha sido agregado correctamente'); 
});

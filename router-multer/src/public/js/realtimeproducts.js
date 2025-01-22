const socket = io();

// Contenedor dinámico de productos
const productsContainer = document.getElementById('products-container');

// Función para renderizar la lista de productos
function renderProducts(products) {
    productsContainer.innerHTML = ''; // Limpiar el contenedor
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('card', 'product-card');
        productCard.style.width = '18rem';
        productCard.setAttribute('data-id', product.id);
        productCard.innerHTML = `
            <img src="${product.thumbnail}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${product.title} - $${product.price}</h5>
                <p class="card-text">${product.description}</p>
                <p class="card-text">Stock: ${product.stock}</p>
            </div>
        `;
        productsContainer.appendChild(productCard);
    });
}

// Escuchar actualizaciones desde el servidor
socket.on('server:productList', (products) => {
    renderProducts(products); // Actualizar productos en tiempo real
});

const itemList = document.getElementById("item-list");

const addProduct = (newProduct) =>{
    itemList.innerHTML += `
    <img src="${newProduct.thumbnail}" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">${newProduct.title} $: ${newProduct.price}</h5>
        <p class="card-text">${newProduct.description}</p>
        <p class="card-text">Stock: ${newProduct.stock}</p>
        <a href="#" class="btn btn-danger">Delete</a>
        <a href="#" class="btn btn-primary">UpDate</a>
    </div>
    `;
};



       


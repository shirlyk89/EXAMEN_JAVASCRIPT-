export function mostrarProductos(productos, contenedor, agregarAlCarrito) {
  contenedor.innerHTML = "";

  productos.forEach(producto => {
    const card = document.createElement("div");
    card.classList.add("producto");

    card.innerHTML = `
      <img src="${producto.image}" alt="${producto.title}">
      <h3>${producto.title}</h3>
      <p>$ ${producto.price}</p>
      <button class="add-to-cart">Agregar al carrito</button>
    `;

    const boton = card.querySelector(".add-to-cart");

    
    card.querySelector("button").addEventListener("click", () => {
      agregarAlCarrito(producto);
    });
    contenedor.appendChild(card);
  });
}


//function agregarcarrito(productos){
// const contenedor = document.getElementById("contenedorProductos");
  ///  contenedor.innerHTML = "";

  //  productos.forEach(producto => {

//        const card = document.createElement("article");
  //      card.classList.add("Product-card");

        
    //card.innerHTML = `
      //<img src="${producto.image}" alt="${producto.title}">
      //<h3>${producto.title}</h3>
      //<p class="category">${producto.category}</p>
      //<p class="price">$${producto.price}</p>
      //<button class="add-to-cart">Agregar al carrito</button>
    //`;

      //  contenedor.appendChild(card);

        
    //});
//}


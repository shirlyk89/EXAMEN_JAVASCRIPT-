import { obtenerProductos } from "./api.js";
import { mostrarProductos } from "./ui.js";
import { agregarAlCarrito, renderizarCarrito } from "./cart.js";
import { finalizarCompra } from "./cart.js";
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");


const contenedor = document.getElementById("contenedorProductos");
const selectCategorias = document.getElementById("filtroCa");

let productosAPI = [];

document.addEventListener("DOMContentLoaded", async () => {
  productosAPI = await obtenerProductos();
  sortSelect.addEventListener("change", ordenarProductos);

 


  cargarCategorias(productosAPI);
  mostrarProductos(productosAPI, contenedor, agregarAlCarrito);
  renderizarCarrito();

   searchInput.addEventListener("input", filtrarProductos);
    searchInput.addEventListener("input", buscarPorNombre);
  selectCategorias.addEventListener("change", filtrarPorCategoria);
});

function filtrarProductos() {
  const texto = searchInput.value.toLowerCase();
  const categoria = selectCategorias.value;

  let filtrados = productosAPI;

  if (categoria !== "all") {
    filtrados = filtrados.filter(p => p.category === categoria);
  }

  if (texto !== "") {
    filtrados = filtrados.filter(p =>
      p.title.toLowerCase().includes(texto)
    );
  }

  mostrarProductos(filtrados, contenedor, agregarAlCarrito);
}


function buscarPorNombre() {
  const textoBuscado = searchInput.value.toLowerCase();

  const productosFiltrados = productosAPI.filter(producto =>
    producto.title.toLowerCase().includes(textoBuscado)
  );

  mostrarProductos(productosFiltrados, contenedor, agregarAlCarrito);
}

function cargarCategorias(productos) {
  selectCategorias.innerHTML = 
  ` <option value="all">Todas las categorías</option>
  `;
    console.log("cargando categorias");
  const categorias = [...new Set(productos.map(p => p.category))];
  categorias.forEach(categoria => {
    const option = document.createElement("option");
    option.value = categoria;
    option.textContent = categoria;
    selectCategorias.appendChild(option);

  
  });
}

function filtrarPorCategoria() {
  const categoriaSeleccionada = selectCategorias.value;

  const filtrados =
    categoriaSeleccionada === "all"
      ? productosAPI
      : productosAPI.filter(p => p.category === categoriaSeleccionada);

  mostrarProductos(filtrados, contenedor, agregarAlCarrito);

}



document.addEventListener("DOMContentLoaded", async () => {
  productosAPI = await obtenerProductos();

  
const botonFinalizar = document.querySelector(".checkout-btn");

  cargarCategorias(productosAPI);
  mostrarProductos(productosAPI, contenedor, agregarAlCarrito);
  renderizarCarrito();

  botonFinalizar.addEventListener("click", finalizarCompra);
});


function ordenarProductos() {
  const criterio = sortSelect.value;
  let productosOrdenados = [...productosAPI];

  switch (criterio) {
    case "price-asc":
      productosOrdenados.sort((a, b) => a.price - b.price);
      break;

    case "price-desc":
      productosOrdenados.sort((a, b) => b.price - a.price);
      break;

    case "name-asc":
      productosOrdenados.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
      break;

    case "name-desc":
      productosOrdenados.sort((a, b) =>
        b.title.localeCompare(a.title)
      );
      break;
  }

  mostrarProductos(productosOrdenados, contenedor, agregarAlCarrito);
}

let filtros = {
  categoria: "all",
  busqueda: "",
  orden: "",

};

function aplicarfiltros(){
  let resultado = [... productosAPI];

  if(filtros.categoria !== "all"){
    resultado = resultado.filter(
      p => p.category === filtros.categoria
    );
  }

  if(filtros.busqueda){
    resultado = resultado.filter(p => p.title.toLowerCase().includes(filtros.busqueda));
  }

  if(filtros.orden === "az"){
  resultado.sort((a, b) => a.title.localeCompare(b.title));
  }

  mostrarProductos(resultado, contenedor, agregarAlCarrito)
}
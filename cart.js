
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

export function agregarAlCarrito(producto) {
  const item = carrito.find(p => p.id === producto.id);

  if (item) {
    item.cantidad++;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  guardarCarrito();
  renderizarCarrito();

}

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

export function renderizarCarrito() {
  const lista = document.getElementById("cartItems");
  const total = document.getElementById("cartTotal");
  const contador = document.querySelector(".idcontador")

  
  if (!lista || !total || !contador) return;

  contador.textContent = totalProductos()

  lista.innerHTML = "";
  let suma = 0;

  carrito.forEach(item => {
    suma += item.price * item.cantidad;

    const li = document.createElement("li");
    li.classList.add("cart-item");

    li.innerHTML = `
      <span>${item.title}</span>
      <div  class="cantidad">
      <button class="menos-bt">-</button>
      <span>${item.cantidad}</span>
      <button class="mas-bt">+</button>
      </div>

      <span>$${(item.price * item.cantidad).toFixed(2)}</span>
      <button class="remove-item">✕</button>
    `;

    li.querySelector(".remove-item").addEventListener("click", () => {
      eliminarDelCarrito(item.id);
    });

    li.querySelector(".menos-bt").addEventListener("click", () => {
      menosbt(item.id);
    } );

     li.querySelector(".mas-bt").addEventListener("click", () => {
      masbt(item.id);
    } );


    
    lista.appendChild(li);
  });

  total.textContent = `$${suma.toFixed(2)}`;
}

function eliminarDelCarrito(id) {
  carrito = carrito.filter(item => item.id !== id);
  guardarCarrito();
  renderizarCarrito();
}

function menosbt(producto){
  const item = carrito.find(p => p.id === producto);
  if (!item) return;
  
  if(item.cantidad === 1){
   eliminarDelCarrito(id);
    return;
  }
  item.cantidad--;

  guardarCarrito();
  renderizarCarrito();

}

function masbt(producto){
  const item = carrito.find(p => p.id === producto);
  if (!item) return;

  if(item.cantidad >= 1){
    item.cantidad++;
  }
  guardarCarrito();
  renderizarCarrito();

}


function totalProductos(){
let totalpro = 0
carrito.forEach(item => {
  totalpro += item.cantidad;
})

return totalpro
}


export function finalizarCompra() {
  if (carrito.length === 0) {
    alert("El carrito está vacío");
    return;
  }

  alert("¡Compra realizada con éxito! =D");

  carrito = [];
  localStorage.removeItem("carrito");
  renderizarCarrito();
}

export function cantidad(){

}
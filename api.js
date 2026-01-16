export async function obtenerProductos() {
  const respuesta = await fetch("https://fakestoreapi.com/products");
  return await respuesta.json();
}


//Variables

const contenedorProductos = document.querySelector("#contenedor-productos"); //
const contenedorCarrito = document.querySelector("tbody");
const precioTotal = document.querySelector(".precioTotal");
const btnVaciarCarrito = document.querySelector("#vaciar-carrito");

let carrito = [];
let total = 0;

//Generar los productos en el html
stockProductos.forEach((producto) => {
  const a = document.createElement("a");
  a.setAttribute("href", "../productDetails.html");
  const div = document.createElement("div");
  div.classList.add(
    "w-full",
    "p-6",
    "bg-white",
    "rounded-xl",
    "shadow-xl",
    "md:w-80"
  );
  div.innerHTML = `
  <img src="${producto.imagen}" alt='Imagen del Producto'>
  <div class='mt-4'>
    <h2 class="text-2xl font-bold text-gray-700">${producto.nombre}</h2>
    <p class="block text-xl font-semibold text-gray-700 mb-2">$ <span>${producto.precio}</span> </p>
    <button data-id='${producto.id}' class="agregar-carrito text-lg block font-semibold py-2 px-4 text-white bg-green-400 rounded-lg shadow ">Añadir al Carrito </button>
  </div>
  `;
  a.appendChild(div);
  contenedorProductos.appendChild(a);
});

//Eventos

contenedorProductos.addEventListener("click", agregarProducto);
contenedorCarrito.addEventListener("click", eliminarProducto);
btnVaciarCarrito.addEventListener("click", vaciarCarrito);

//Funciones
carritoVacio();
function carritoVacio() {
  if (carrito.length === 0) {
    contenedorCarrito.innerHTML = `
    <td colspan='6' class='font-bold text-xl text-center py-2'> Tu carrito está vacío, como mi bolsillo :( </td>
    `;
    precioTotal.innerHTML = 0;
  }
}

function vaciarCarrito(e) {
  carrito = [];
  total = 0;
  borrarHtmlPrevio();
  carritoVacio();
}

function eliminarProducto(e) {
  if (e.target.classList.contains("borrar-producto")) {
    const productoId = e.target.parentElement.getAttribute("data-id");
    carrito.forEach((item) => {
      if (item.id === productoId) {
        let restarTotal = item.precio * item.cantidad;
        total = total - restarTotal;
        precioTotal.innerText = `${total}`;
      }
    });
    carrito = carrito.filter((producto) => producto.id !== productoId);
  }

  generarCarrito();
}

function agregarProducto(e) {
  e.preventDefault();
  if (e.target.classList.contains("agregar-carrito")) {
    const productoSeleccionado = e.target.parentElement.parentElement;
    extraerInfoProducto(productoSeleccionado);
  }
}

function extraerInfoProducto(producto) {
  const productoInfo = {
    imagen: producto.querySelector("img").src,
    nombre: producto.querySelector("h2").textContent,
    precio: producto.querySelector("p span").textContent,
    cantidad: 1,
    id: producto.querySelector("button").getAttribute("data-id"),
  };
  actualizarCantidadProducto(productoInfo);
  actualizarTotal(productoInfo);
  generarCarrito();
}

function actualizarTotal(item) {
  total = parseInt(total) + parseInt(item.precio);
  precioTotal.innerText = total;
}

function actualizarCantidadProducto(producto) {
  const productoRepetido = carrito.some((item) => item.id === producto.id);
  if (productoRepetido) {
    const productosActualizados = carrito.map((prod) => {
      if (prod.id === producto.id) {
        prod.cantidad++;
        return prod;
      } else {
        return prod;
      }
    });
    carrito = [...productosActualizados];
  } else {
    carrito = [...carrito, producto];
  }
}

function generarCarrito() {
  borrarHtmlPrevio();
  carritoVacio();
  carrito.forEach((producto) => {
    const row = document.createElement("tr");
    row.innerHTML = `
    <td> <img src='${producto.imagen}' width='100'> </td>
    <td> ${producto.nombre} </td>
    <td>$ ${producto.precio} </td>
    <td> ${producto.cantidad} </td>
    <td> <button href='#' data-id='${producto.id}' > <i class=" borrar-producto text-red-600 fa-solid fa-trash-can"></i> </button> </td>
    `;
    contenedorCarrito.appendChild(row);
  });
}

function borrarHtmlPrevio() {
  while (contenedorCarrito.firstChild) {
    if (contenedorCarrito.firstChild) {
      contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
  }
}

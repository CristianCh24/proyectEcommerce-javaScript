const contenedorTarjetas = document.getElementById("cart-container");
const cantidadElement = document.getElementById("cantidad");
const precioElement = document.getElementById("precio");
const carritoVacioElement = document.getElementById("carrito-vacio");
const totalesContainer = document.getElementById("totales");

// Crea las tarjetas de productos teniendo en cuenta lo guardado en localstorage //
function crearTarjetasProductosCarrito() {
  contenedorTarjetas.innerHTML = "";
  const productos = JSON.parse(localStorage.getItem("mercaderias"));

  if (productos && productos.length > 0) {
    productos.forEach((producto) => {
      const nuevaMercaderia = document.createElement("div");
      nuevaMercaderia.classList = "tarjeta-producto";
      nuevaMercaderia.innerHTML = `
    <img src="${producto.imagen}" alt="${producto.nombre}">
    <h3>${producto.nombre}</h3>
    <span>$${producto.precio}</span>
    <div>
    <button>-</button>
    <span class="cantidad">${producto.cantidad}</span>
    <button>+</button>
    </div>
    `;
      contenedorTarjetas.appendChild(nuevaMercaderia);

      nuevaMercaderia
        .getElementsByTagName("button")[0]
        .addEventListener("click", (e) => {
          const cantidadElement = e.target.parentElement.getElementsByClassName("cantidad")[0];
          cantidadElement.innerText = restarAlCarrito(producto);
          crearTarjetasProductosCarrito();
          actualizarTotales();
        });

      nuevaMercaderia
        .getElementsByTagName("button")[1]
        .addEventListener("click", (e) => {
          const cantidadElement = e.target.parentElement.getElementsByClassName("cantidad")[0];
          cantidadElement.innerText = agregarAlCarrito(producto);
          actualizarTotales();
        });
    });
  }

  revisarMensajeVacio();
  actualizarTotales();
  actualizarNumeroCarrito();
}

crearTarjetasProductosCarrito();

// Actualiza el total de precio y unidades de la página del carrito //
function actualizarTotales() {
  const productos = JSON.parse(localStorage.getItem("mercaderias"));
  let cantidad = 0;
  let precio = 0;

  if (productos && productos.length > 0) {
    productos.forEach((producto) => {
      cantidad += producto.cantidad;
      precio += producto.precio * producto.cantidad;
    });
  }

  cantidadElement.innerText = cantidad;
  precioElement.innerText = precio;

  if(precio === 0) {
    reiniciarCarrito();
    revisarMensajeVacio();
  }
}

document.getElementById("reiniciar").addEventListener("click", () => {
  contenedorTarjetas.innerHTML = "";
  reiniciarCarrito();
  revisarMensajeVacio();
});

// Muestra o esconde el mensaje de que no hay nada en el carrito //
function revisarMensajeVacio() {
  const productos = JSON.parse(localStorage.getItem("mercaderias"));
  carritoVacioElement.classList.toggle("escondido", productos);
  totalesContainer.classList.toggle("escondido", !productos);
}

document.getElementById('comprar').addEventListener('click', () => {
  // Recupera el nombre del usuario desde localStorage //
  const userName = localStorage.getItem('userName') || 'Usuario';

  // Muestra la alerta con el nombre del usuario //
  Swal.fire({
      title: '¡Compra realizada!',
      text: `Gracias por tu compra, ${userName}`,
      icon: 'success',
      confirmButtonText: 'Fue un placer'
  });

  // Limpia el contenedor de tarjetas y reinicia el carrito //
  contenedorTarjetas.innerHTML = "";
  reiniciarCarrito();
  revisarMensajeVacio();
});


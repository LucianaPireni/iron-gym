//Captura de nodos
const carritoContainer = document.getElementById("seccion-carrito")
const totalContainer = document.getElementById("seccion-total")
const vaciar = document.getElementById("vaciar-carrito")

//Recuepero localStorage
let cartStorage = JSON.parse(localStorage.getItem("cartProductos")) || []

//Array de subtotales
let subtotales = []

// Función para renderizar el carrito
function renderCarrito (carritoItems) {
  carritoContainer.innerHTML = ""
    if (carritoItems.length === 0) {
      carritoContainer.innerHTML = ""
      totalContainer.innerHTML = ""
      return
    } else{
        carritoItems.forEach (producto => {
          const cantidad = producto.cantidad || 1
          const subtotal = producto.precio * cantidad
          subtotales.push(subtotal)
          const carrito = document.createElement ("div")
          carrito.className = "clase-comprada"
          carrito.innerHTML = `<h3 class="nombre-carrito">${producto.nombre}</h3>
                              <p class="cantidad-carrito">Cantidad: ${cantidad}</p>
                            <p class= "subtotal-carrito">Subtotal: $${subtotal}</p>`
          carritoContainer.appendChild(carrito)
        })
      } 
  actualizarResumen()
}

// Función para actualizar el resumen
function actualizarResumen() {
  totalContainer.innerHTML = ""
  if (subtotales.length === 0) return
  const total = subtotales.reduce((suma, actual) => suma + actual, 0)
  const resumen = document.createElement("div")
  resumen.innerHTML = `<h2 class="texto-resumen">TOTAL A PAGAR: $${total}</h2>`
  totalContainer.appendChild(resumen)
}
renderCarrito(cartStorage)

// Función para vaciar carrito y el localStorage
vaciar.onclick =()=>{
  localStorage.clear()
  cartStorage = []
  renderCarrito(cartStorage)
}






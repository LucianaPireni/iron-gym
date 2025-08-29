//Variable para guardar productos del carrito 
let productos = []

// Recupero localStorage
let cartProductos = JSON.parse(localStorage.getItem("cartProductos")) || []

 //Petición de los productos
 const productsContainer = document.getElementById("seccion-productos")
 const URL = "./db/data.json" 

 function obtenerProductos() {
      fetch(URL)
          .then (response => response.json())
          .then (data => {
              productos = data   
              console.log(productos)
              renderProductos(productos)
          }) 
          .catch ((err) => console.log("Hubo un error: ", err))
          .finally (() => console.log("Fin de la petición"))
 }
 obtenerProductos()

//Función para renderizar los productos
function renderProductos(listaProductos) {
  productsContainer.innerHTML = ""
  listaProductos.forEach(producto => {
    const card = document.createElement("div")
    card.className = "card"
    card.innerHTML = `<h3 class="nombre-producto">${producto.nombre}</h3>
                      <h4 class="precio-producto">$${producto.precio}</h4>
                      <button type= button class="btn btn-light plus-button">+</button>
                      <span class="counter">0</span>
                      <button type= button class="btn btn-light minus-button">-</button>
                      <button type="button" class="btn btn-light agregar" id="${producto.id}">Agregar</button>`
    productsContainer.appendChild(card)
  })
  activarBotonesCantidad()
  agregarAlCarrito()
}

// Funciones para Botones contadores
function activarBotonesCantidad() {
  plusButton = document.querySelectorAll(".plus-button")
  plusButton.forEach(button => {
    button.onclick = (e) => {
      const counter = e.target.parentElement.querySelector(".counter")
      counter.textContent = parseInt(counter.textContent) + 1
    }
  })

  minusButton = document.querySelectorAll(".minus-button")
  minusButton.forEach(button => {
    button.onclick = (e) => {
      const counter = e.target.parentElement.querySelector(".counter")
      let valor = parseInt(counter.textContent)
      if (valor > 0) counter.textContent = valor - 1
    }
  })
}

// Función para Agregar al carrito
function agregarAlCarrito() {
  addButton =document.querySelectorAll(".agregar")
  addButton.forEach(button => {
    button.onclick = (e) => {
      const productId = parseInt(e.currentTarget.id)
      const card = e.currentTarget.parentElement
      const cantidad = parseInt(card.querySelector(".counter").textContent)

      // Advertencia de 0 unidades
      if (cantidad === 0) {
        Swal.fire({
          text: "La cantidad debe ser mayor a 0",
          icon: "error",
          width: 400
        });
        return
      }
     // Verificacón de si existe el producto en el carrito y agregarlo 
      const existe = cartProductos.some(item => item.id === productId)

      if (existe) {
        const productInCart = cartProductos.find(producto => producto.id === productId)
        productInCart.cantidad += cantidad
      } else {
        const selectedProduct = productos.find(producto => producto.id === productId)
        cartProductos.push({
          id: selectedProduct.id,
          nombre: selectedProduct.nombre,
          precio: selectedProduct.precio,
          cantidad: cantidad
        })
      }
      // Guardo en localStorage
      localStorage.setItem("cartProductos", JSON.stringify(cartProductos))
      card.querySelector(".counter").textContent = 0

      // Notificación de Agregado al carrito     
      Toastify({
          text: "Agregado al carrito",
          duration: 3000,
          style: {
            background: "linear-gradient(to right, #98CE00, #8C9A9E)",
          },
      }).showToast();
    }
  })
}



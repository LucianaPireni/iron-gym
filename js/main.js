// Array de objetos
const productos = [
  {
    id: 1,
    nombre: "Crossfit",
    precio: 7000
  },
   {
    id: 2,
    nombre: "Funcional",
    precio: 6000
  },
   {
    id: 3,
    nombre: "Spinning",
    precio: 5000
  },
   {
    id: 4,
    nombre: "Zumba",
    precio: 5000
  },
   {
    id: 5,
    nombre: "Localizada",
    precio: 4000
  },
]

// Recupero localStorage
let cartProductos = JSON.parse(localStorage.getItem("cartProductos")) || []

//Captura del nodo productos
let productsContainer = document.getElementById("seccion-productos")

//Función para renderizar los productos
function renderProductos (productsArray) {
  productsContainer.innerHTML = ""
  productsArray.forEach (producto => {
    const card = document.createElement ("div")
    card.className = "card"
    card.innerHTML = `<h3 class= "nombre-producto">${producto.nombre}</h3>
                      <h4 class= "precio-producto">$${producto.precio}</h4>
                      <button type="button" class="btn btn-light" id="${producto.id}">Agregar</button>`
    productsContainer.appendChild(card)
  })
  agregarAlCarrito()
}
renderProductos(productos)


// Función para Agregar al carrito
function agregarAlCarrito() {
  const addbutton = document.querySelectorAll(".btn")
  addbutton.forEach(button => {
    button.onclick = (e) => {
      const productId = e.currentTarget.id
      //Buscar si el producto existe en el carrito para que no se repitan
      let productInCart = null
      cartProductos.forEach(item => {
        if (item.id == productId) {
          productInCart = item
        }
      })
      if (productInCart) {
        productInCart.cantidad = productInCart.cantidad + 1
      } else {
          let selectedProduct = null
          productos.forEach(producto => {
            if (producto.id == productId) {
              selectedProduct = producto
            }
          })
          cartProductos.push({
            id: selectedProduct.id,
            nombre: selectedProduct.nombre,
            precio: selectedProduct.precio,
            cantidad: 1
          })
        }
        // Guardo en localStorage
        localStorage.setItem("cartProductos", JSON.stringify(cartProductos))
        console.log(cartProductos)
    }
  })
}








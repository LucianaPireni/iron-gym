// Recuperar localStorage 
let cartProductos = JSON.parse(localStorage.getItem("cartProductos")) || []

// Captura de nodos
const carritoContainer = document.getElementById("seccion-carrito")
const totalContainer = document.getElementById("seccion-total")
const btnVaciar = document.getElementById("vaciar-carrito")
const btnPagar = document.getElementById("btn-pagar")

// Función para renderizar el carrito
function renderCarrito(carritoItems) {
  carritoContainer.innerHTML = ""
  totalContainer.innerHTML = ""

  if (carritoItems.length === 0) {
    carritoContainer.innerHTML = `<p class="carrito-vacio">El carrito está vacío</p>`
    btnPagar.disabled = true; 
    return
  }

  btnPagar.disabled = false; 

  let total = 0

  carritoItems.forEach(item => {
    const carrito = document.createElement("div")
    carrito.className = "carrito"
    carrito.innerHTML =`<h3>${item.nombre}</h3>
                        <button class="btn btn-sm btn-light minus-item" id="${item.id}">-</button>
                        <span class="cantidad">${item.cantidad}</span>
                        <button class="btn btn-sm btn-light plus-item" id="${item.id}">+</button>
                        <span> $${item.precio * item.cantidad}</span>
                        <button class="btn btn-sm btn-danger eliminar-item" id="${item.id}">Eliminar</button>`
    carritoContainer.appendChild(carrito)
    total += item.precio * item.cantidad
  })

  totalContainer.innerHTML = `<h3 class="texto-resumen">TOTAL A PAGAR: $${total}</h3>`

// Botones del carrito
  plusItem = document.querySelectorAll(".plus-item")
  plusItem.forEach(btn => {
    btn.onclick = () => {
      const id = parseInt(btn.id)
      const item = carritoItems.find(p => p.id === id)
      item.cantidad++
      localStorage.setItem("cartProductos", JSON.stringify(carritoItems))
      renderCarrito(carritoItems)
    }
  })

  minusItem = document.querySelectorAll(".minus-item")
  minusItem.forEach(btn => {
    btn.onclick = () => {
      const id = parseInt(btn.id)
      const item = carritoItems.find(p => p.id === id)
      if (item.cantidad > 1) {
        item.cantidad--
      } else {
        // En 0 eliminar
        carritoItems = carritoItems.filter(p => p.id !== id)
      }
      localStorage.setItem("cartProductos", JSON.stringify(carritoItems))
      renderCarrito(carritoItems)
    }
  })

  deleteItem = document.querySelectorAll(".eliminar-item")
  deleteItem.forEach(btn => {
    btn.onclick = () => {
      const id = parseInt(btn.id)
      carritoItems = carritoItems.filter(p => p.id !== id)
      localStorage.setItem("cartProductos", JSON.stringify(carritoItems))
      renderCarrito(carritoItems)
    }
  })
}

// Botón Vaciar carrito
if (btnVaciar) {
  btnVaciar.onclick = () => {
    cartProductos = []
    localStorage.removeItem("cartProductos")
    renderCarrito(cartProductos)
  }
}

// Botón Pagar
if (btnPagar) {
  btnPagar.onclick = () => {
    Swal.fire({
      title: "Confirmás la compra?",
      icon: "question",
      showCancelButton: true,
      cancelButtonText: "Seguir Comprando",
      confirmButtonColor: "#98CE00",
      cancelButtonColor: "#8C9A9E",
      confirmButtonText: "Sí, Pagar",
      allowOutsideClick: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { value: formValues } = await Swal.fire({
          title: "Ingresá tus datos",
          html:`<div class="swal2-html-container" ">
                  <div>
                    <label for="username">Nombre</label>
                    <input type="text" id="username" class="swal2-input" placeholder="Lucía">
                  </div>
                  <div>
                    <label for="lastname">Apellido</label>
                    <input type="text" id="lastname" class="swal2-input" placeholder="Martinez">
                  </div>
                  <div>
                    <label for="email">Email</label>
                    <input type="email" id="email" class="swal2-input" placeholder="lucia@correo.com">
                  </div>
                  <div class="radio-cards">
                    <label>Forma de Pago</label><br>
                    <div class="option-cards">
                      <input type="radio" name="pago" value="Visa"> Visa
                      <input type="radio" name="pago" value="Amex"> Amex
                      <input type="radio" name="pago" value="Mastercard"> Mastercard
                    </div>
                  </div>
                  <div>
                    <label for="card-number">Número de Tarjeta (con guiones)</label>
                    <input type="text" id="card-number" class="swal2-input" placeholder="xxxx-xxxx-xxxx-xxxx">
                  </div>
                  <div class="card-info">
                    <div class="card-thru">
                      <label for="card-thru">Vencimiento</label>
                      <input type="text" id="card-thru" class="swal2-input" placeholder="MMAA">
                    </div>
                    <div class="pin">
                      <label for="pin">Cod. Seguridad</label>
                      <input type="password" id="pin" class="swal2-input" placeholder="123">
                    </div>
                  </div>
                </div>`,
          focusConfirm: false,
          allowOutsideClick: false,
          preConfirm: () => {
            const username = document.getElementById("username").value
            const lastname = document.getElementById("lastname").value
            const email = document.getElementById("email").value
            const pago = document.querySelector("input[name='pago']:checked")?.value
            const cardNumber = document.getElementById("card-number").value
            const cardThru = document.getElementById("card-thru").value
            const pin = document.getElementById("pin").value
            if (!username || !lastname || !email || !pago || !cardNumber || !cardThru || !pin) {
              Swal.showValidationMessage("Todos los campos son obligatorios")
              return false
            }
            return { username, lastname, email, pago, cardNumber, cardThru, pin}
          }
        })
        // Cálculo Resumen de Compra
        if (formValues) {
          let total = 0
          let resumen = "<ul>"
          cartProductos.forEach(item => {
            resumen += `<li>${item.nombre} x ${item.cantidad} : $${item.precio * item.cantidad}</li>`
            total += item.precio * item.cantidad
          })
          resumen += `</ul><p class="total-resumen"><b>Total: $${total}</b></p>`
          // Compra exitosa
          await Swal.fire({
            title: "Compra exitosa!",
            html: `<p>Gracias <b>${username.value}</b>, acá está el Resúmen de tu Compra:</p>
                    ${resumen}
                    <br>
                    <p>Te esperamos en Av. Pedro Goyena 1356 - Caballito</p>
                    <br><br>
                    <p class="logo">Iron Gym</p>`,
            icon: "success",
            width: 500,
            allowOutsideClick: false,
          });
        }
        cartProductos = [] 
        localStorage.removeItem("cartProductos") 
        renderCarrito(cartProductos)
      } 
    });     
  }
}
renderCarrito(cartProductos)


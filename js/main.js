//Arrays
const clases = ["crossfit", "funcional", "spinning", "zumba", "localizada"]
const precios = [7000, 6000, 5000, 5000, 4000]

//Mensajes de Bienvenida por consola 
console.log("Bienvenido a Iron Gym \n\nBrindamos las siguientes clases: ")
for (const clase of clases){
  console.log(clase)
}
console.log("\nValor de las clases:  \n\n" + clases[0] + " $ " + precios[0] + "\n" + clases[1] + " $ " + precios[1] + "\n" + clases [2] + " $ " + precios[2] + "\n" + clases [3] + " $ " + precios[3] + "\n" + clases [4] + " $ " + precios[4])

//Funcion total de la disciplina
const totalDisciplina = (valorA, valorB) => valorA * valorB

//Variables Total Disciplinas
let totalCross = 0
let totalFunc = 0
let totalSpin = 0
let totalZum = 0
let totalLocal = 0

//Funcion y condicional para validar edad
let continuar = true
let edad = parseInt(prompt("Cuántos años tenés?"))
const validarEdad = (edad) => {
  if (edad >= 13 && edad < 18) {
    alert("Debes venir acompañado")
    return true
  } else if (edad < 13) {
    alert("No podés concurrir")
    return false
  } else {
    alert("Sigamos, vas a elegir la cantidad y la disciplina a adquirir")
    return true
  }
}
continuar = validarEdad(edad)


//Condicional con switch
while (continuar){
  let sesiones = parseInt (prompt("Cuantas clases querés comprar?"))
  let menu = parseInt (prompt("Elegí la clase: \n 1- Para CrossFit \n 2- Para Funcional \n 3- Para Spinning \n 4- Para Zumba \n 5- Para Localizada"))
  if (sesiones > 0){ 
   switch (menu){
      case 1:
        let subtotalCross = totalDisciplina(precios[0], sesiones)
        totalCross = totalCross + subtotalCross
        console.log ("El total a abonar por " + sesiones + " clases de CrossFit es de $ " + subtotalCross)
        break    
      case 2:
        let subtotalFunc = totalDisciplina(precios[1], sesiones)
        totalFunc = totalFunc + subtotalFunc
        console.log ("El total a abonar por " + sesiones + " clases de Funcional es de $ " + subtotalFunc)
        break    
      case 3:
        let subtotalSpin = totalDisciplina(precios[2], sesiones)
        totalSpin = totalSpin + subtotalSpin
        console.log ("El total a abonar por " + sesiones + " clases de Spinning es de $ " + subtotalSpin)
        break
      case 4:
        let subtotalZum = totalDisciplina(precios[3], sesiones)
        totalZum = totalZum + subtotalZum
        console.log ("El total a abonar por " + sesiones + " clases de Zumba es de $ " + subtotalZum)
        break
      case 5:
        let subtotalLocal = totalDisciplina(precios[4], sesiones)
        totalLocal = totalLocal + subtotalLocal
        console.log ("El total a abonar por " + sesiones + " clases de Localizada es de $ " + subtotalLocal)
        break
      default:
        alert ("Error de Ingreso")
        break
    }
    let confirmacion = prompt ("Desea comprar más clases? (si/no)").toLowerCase()
    if (confirmacion == "no"){
            continuar = false
            alert ("Mirá el resumen de tu compra en la pantalla \n\nTe esperamos para entrenar. Gracias!")
    }             
  } else {
      alert("Cantidad inválida. No se procesará la compra.")
  }          
} 

// Funcion resumen final
const calcularTotalFinal = (cross, func, spin, zum, loc) => cross + func + spin + zum + loc

//Mensaje del Resumen final por consola
console.log("Resumen de Compra:\n\nCrossFit: $ " + totalCross + "\nFuncional: $ " + totalFunc + "\nSpinning: $ " + totalSpin + "\nZumba: $ " + totalZum + "\nLocalizada: $ " + totalLocal +"\n\nTOTAL A PAGAR: $ " + calcularTotalFinal(totalCross, totalFunc, totalSpin, totalZum, totalLocal))





 
  




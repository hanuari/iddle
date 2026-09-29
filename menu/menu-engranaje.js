import { datosJuego } from "../objeto-juego-completo.js"
import { iniciarMapa } from "../paginas/mapa/mapa-engranaje.js"


const mostrarMapa = document.getElementById("mostrar-mapa")
const mostrarFarmeo = document.getElementById("mostrar-farmeo")
const mostrarCasa = document.getElementById("mostrar-casa")
const mostrarCiudad = document.getElementById("mostrar-ciudad")
const mostrarGrupo = document.getElementById("mostrar-grupo")
const mostrarCombate = document.getElementById("mostrar-combate")





export function menuJuego(boton) {
    if (boton === "mapa") {
        cerrarMenu()
        mostrarMapa.classList.remove("ocultar")
        iniciarMapa()
    }

    if (boton === "grupo") {
        cerrarMenu()
        mostrarGrupo.classList.remove("ocultar")
    }

}


export function cerrarMenu() {
    mostrarMapa.classList.add("ocultar")
    mostrarCasa.classList.add("ocultar")
    mostrarGrupo.classList.add("ocultar")
    mostrarCombate.classList.add("ocultar")
    mostrarCiudad.classList.add("ocultar")
    mostrarFarmeo.classList.add("ocultar")
}



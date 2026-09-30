import { datosJuego } from "../../objeto-juego-completo.js"
import { cancelarFarmeoAhora, empezarFarmearZona, seleccionarPersonajeUbicacion, } from "./farmeo-engranaje.js"
import { apagarmostrarDetallesZona, mostrarDetallesZona, mostrarZonasFarmear, mostrarZonasTrabajar } from "./farmeo-interfaz.js"

const botonFarmearID = document.querySelector(".class-inventario-farmear")
const contenedorParaTradearBotones100 = document.getElementById("botones-para-tradear")
const transferirTodo = document.getElementById("transferir-todo")
const contenedorIventarioUbicacion = document.getElementById("inventario-ubicacion")

// CARAS SELECCIONAR
document.addEventListener("click", (e) => {
    if (e.target.closest(".lista-caras-ubicacion-boton")) {
        const idcompleta = e.target.id
        const idUbicacion = Number(idcompleta.split("-")[2])
        const idPersonaje = Number(idcompleta.split("-")[4])
        seleccionarPersonajeUbicacion(idPersonaje)
    }

})

//boton para farmear
botonFarmearID.addEventListener("click", (e) => {
    if (e.target.classList.contains("boton-farmear")) {
        const botonseleccionado = e.target.dataset.id
        console.log('👉 botonseleccionado:', botonseleccionado);

        if (!botonseleccionado) return
        const zona = Number(botonseleccionado.split("-")[3])
        console.log('👉 zona:', zona);
        const idUbicacion = Number(botonseleccionado.split("-")[2])
        console.log('👉 idUbicacion:', idUbicacion);


        mostrarZonasFarmear(zona, idUbicacion)

    }
})

const zona = 0
const idzona = 1
/* mostrarZonasFarmear(idzona) */

//botones zonas
document.addEventListener("click", (e) => {
    if (e.target.closest(".farmear-zonas-ubicaciones")) {
        const botonseleccionado = e.target.dataset

        if (!botonseleccionado) return
        const IDRecurso = Number(botonseleccionado.idobjeto)
        const idUbicacion = Number(botonseleccionado.ubicacion)
        const posicionZona = Number(botonseleccionado.posicion)

        /*  farmearRecurso(IDRecurso, posicionZona, idUbicacion) */
    }
})

/* farmearRecurso(1, 0, 1) */

//detalles de zona
let zona1 = null
document.addEventListener("click", (e) => {
    if (e.target.closest(".detalle-zonas")) {
        const botonseleccionado = e.target.id
        if (!botonseleccionado) return

        const zona = Number(botonseleccionado.split("-")[3])

        if (zona1 !== zona) {

            if (zona1 !== null) {
                apagarmostrarDetallesZona(zona1)
            }
            mostrarDetallesZona(zona)
            zona1 = zona
        } else {
            mostrarDetallesZona(zona)
            zona1 = zona
        }
    }
})

document.addEventListener("click", (evento) => {
    const boton = evento.target.closest(".tarjeta-zona");

    if (!boton) return;

    const x = Number(boton.dataset.id.split("-")[1])
    const y = Number(boton.dataset.id.split("-")[2])
    const idUbicacion = Number(boton.dataset.ubicacion)

    mostrarZonasTrabajar(idUbicacion, x, y,)

});

mostrarZonasTrabajar(1, 0, 0)

//EMPEZAR RECURSO
document.addEventListener("click", (e) => {
    if (e.target.closest(".boton-farmear-zona")) {
        const idUbicacion = Number(e.target.dataset.ubicacion)
        const idRecurso = Number(e.target.dataset.recurso)
        const col = Number(e.target.dataset.col)
        const fila = Number(e.target.dataset.fila)

        const zonaId = {
            col: col,
            fila: fila
        }
        empezarFarmearZona(idUbicacion, idRecurso, zonaId)
    }
})

// CANCELAR RECURSO
document.addEventListener("click", (e) => {
    if (e.target.closest(".boton-cancelar-zona")) {
        const idUbicacion = Number(e.target.dataset.ubicacion)
        const idRecurso = Number(e.target.dataset.recurso)
        const col = Number(e.target.dataset.col)
        const fila = Number(e.target.dataset.fila)

        const zonaId = {
            col: col,
            fila: fila
        }
        cancelarFarmeoAhora(idUbicacion, idRecurso, zonaId)
    }
})

import { renderizarGrupoEnUI } from "./grupo-interfaz.js"
import { elegirGrupo } from "./grupo-engranaje.js"
import { datosJuego } from "../../../objeto-juego-completo.js";
import { Grupo } from "../../../objetos/grupo-personajes.js";
import { creacionPersonajeInicial } from "../../../funciones/datos-personajes/personaje-logica.js";


const datosPrueba = {
    id: crypto.randomUUID(),
    camino: "rapido",
    estilo: "huida",
    grupo: [3],
    nombre: "Grupo de la MUERTE",
    ubicacion: 4,
};
const datosPrueba2 = {
    id: crypto.randomUUID(),
    camino: "carretera",
    estilo: "agresivo",
    grupo: [3, 10],
    nombre: "La Noche",
    ubicacion: 4,
};


creacionGrupoInicial(datosPrueba)
creacionGrupoInicial(datosPrueba2)

const miembros = datosJuego.grupo;


export function creacionGrupoInicial(datosGrupo) {
    const idGrupo = datosGrupo.id

    crearNuevoGrupo(idGrupo, datosGrupo.nombre)

    const grupoEncontrado = datosJuego.grupo.get(idGrupo);
    const grupo = datosGrupo.grupo



    for (let i = 0; i < grupo.length; i++) {
        const element = grupo[i];
        meterPersonajeEnGrupo(idGrupo, element)
    }

    ubicacionGrupo(idGrupo, Number(datosGrupo.ubicacion))
    cambiarCaminoAhora(idGrupo, datosGrupo.camino)
    cambiarEstiloAhora(idGrupo, datosGrupo.estilo)
    elegirGrupo(idGrupo)

    renderizarGrupoEnUI(grupoEncontrado);
}


function cambiarCaminoAhora(idGrupo, camino) {
    const grupoEncontrado = datosJuego.grupo.get(idGrupo)
    grupoEncontrado.cambiarCamino(camino)
}

function cambiarEstiloAhora(idGrupo, estilo) {
    const grupoEncontrado = datosJuego.grupo.get(idGrupo)
    grupoEncontrado.cambiarEstilo(estilo)
}

function ubicacionGrupo(idGrupo, idUbicacion) {
    const grupoEncontrado = datosJuego.grupo.get(idGrupo)

    grupoEncontrado.ubicacionActual.idUbicacion = idUbicacion

    const ubicacionEncontrado = grupoEncontrado.datosUbicacionActual

    const grid = ubicacionEncontrado.grid
    const posicionX = grid.col
    const posicionY = grid.fila

    grupoEncontrado.establecerPosicionInicial(posicionX, posicionY, ubicacionEncontrado.id_ubicacion)
}

function crearNuevoGrupo(idGrupo, nombreGrupo) {
    const nuevoGrupo = new Grupo(idGrupo, nombreGrupo);
    datosJuego.grupo.set(idGrupo, nuevoGrupo);

}

function meterPersonajeEnGrupo(idGrupo, idPersonajes) {
    const grupoEncontrado = datosJuego.grupo.get(idGrupo)


    const exito = grupoEncontrado.agregarMiembro(idPersonajes);

    if (!exito) {
        return console.error(`❌`)
    }

}






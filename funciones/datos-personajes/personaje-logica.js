import { datosJuego } from "../../objeto-juego-completo.js"
import { Personaje } from "./clase-personajes.js"

export function creacionPersonajeInicial(datosPersonajes) {
    const idPersonaje = datosPersonajes.id
    const nombrePersonaje = datosPersonajes.nombre
    const imagenPersonaje = datosPersonajes.avatar
    crearNuevoPersonaje(idPersonaje, nombrePersonaje, imagenPersonaje)

}

function crearNuevoPersonaje(idPersonaje, nombrePersonaje, imagenPersonaje) {
    const nuevoPersonaje = new Personaje(idPersonaje, nombrePersonaje, imagenPersonaje)

    datosJuego.personajes.set(idPersonaje, nuevoPersonaje)

}
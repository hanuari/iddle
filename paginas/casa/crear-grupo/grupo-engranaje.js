import { datosJuego } from "../../../objeto-juego-completo.js"

let grupoActual = null

export function elegirGrupo(idGrupo) {
    const grupoEncontrado = datosJuego.grupo.get(idGrupo)
    if (!grupoEncontrado) return

    if (grupoActual) {
        grupoActual.cambiarEstado(false)
    }
    grupoEncontrado.cambiarEstado(true)

    grupoActual = grupoEncontrado
}

export function gestionarGrupo(idGrupo) {
    const grupoEncontrado = grupoPersonajes.get(idGrupo)




}



import { datosJuego } from "../../objeto-juego-completo.js";
import { RecursoClass, recursosFarmeable } from "./clase-recursos.js"


function crearNuevoRecurso(datos) {
    const nuevoRecurso = new RecursoClass(datos);
    datosJuego.recursos.set(nuevoRecurso.id_recurso, nuevoRecurso);
    return nuevoRecurso;
}

export function creacionRecursosInicial(listaRecursos = recursosFarmeable) {
    listaRecursos.forEach(datos => {
        crearNuevoRecurso(datos);
    });
}
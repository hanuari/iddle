import { cantidadPersonaje } from "./funciones/datos-personajes/clase-personajes.js"
import { mapaDelJuego } from "./funciones/datos-ubicaciones/clase-ubicaciones.js";
import { estructurasNiveles } from "./objetos/niveles.js";
import { cantidadEnemigos } from "./funciones/datos-enemigos/clase-enemigos.js";
import { cantidadObjeto } from "./funciones/datos-objetos/clase-objetos.js";
import { recetas } from "./objetos/recetas.js";
import { cantidadRecursos } from "./funciones/datos-recursos/clase-recursos.js"
import { cantidadGrupos, GrupoBase } from "./funciones/datos-grupo/clase-grupo.js";
import { cantidadZona } from "./funciones/datos-zonas-enemigas/clase-zona-enemigas.js";
import { menuJuego } from "./menu/menu-engranaje.js";
import { cantidadEventos } from "./funciones/datos-eventos/clase-eventos.js";
import { TiempoBase } from "./funciones/datos-tiempo/clase-tiempo.js"
import { iniciarInterfazFarmeoUbicacion, mostrarZonasFarmear, mostrarZonasTrabajar } from "./paginas/zonas-farmeo/farmeo-interfaz.js";
import { zonasGeneral } from "./funciones/datos-zonas-farmeo/clase-zonas-farmeo.js";
import { zonasCreadasAleatoriamentetotal } from "./funciones/datos-zonas-farmeo/zonas-creadas/clase-zona-creadas.js";
import { crearZonasAleatoriaBioma } from "./paginas/zonas-farmeo/farmeo-engranaje.js";




export const datosJuego = {
    personajes: new Map(cantidadPersonaje.map(u => [u.id_jugador, u])),

    ubicaciones: new Map(mapaDelJuego.map(u => [u.id_ubicacion, u])),

    recursos: new Map(cantidadRecursos.map(u => [u.id_recurso, u])),

    grupos: new Map(cantidadGrupos.map(u => [u.id_grupo, u])),

    objetosPersonajes: new Map(cantidadObjeto.map(e => [e.id_objeto, e])),

    enemigos: new Map(cantidadEnemigos.map(e => [e.id_enemigo, e])),

    zonasEnemigos: new Map(cantidadZona.map(e => [e.id_zonaEnemiga, e])),

    eventos: new Map(cantidadEventos.map(e => [e.id_evento, e])),

    zonasGenerales: new Map(zonasGeneral.map(e => [e.tipo, e])),

    andalucia: new Map(zonasCreadasAleatoriamentetotal.map(e => [e.id_zona_creada_aleatoriamente, e])),

    recetas: new Map(recetas.map(e => [e.id_receta, e])),



    /*  nivelesUbicaciones: new Map( .map(e => [e.id_nivelUbicacion, e])), 
    si el nivel es 1, habra un min y un max, esos parametros individuales se pueden gestionar, habria que hacer el standar. apartete que se puede jugar con el nivel poner un max menos pero el promedio de nivel de enemigo sea superior.
    
    
    */

    /*  nivelesEnemigos: new Map( .map(e => [e.id_nivelEnemigo, e])), 
    esto sera influido con el nivel de la ubicacion,  
    donde los parametros de vida,daño, seran mejores.
    */

    /*  nivelesEstructuras: new Map(estructurasNiveles.map(e => [e.id_nivelEstructura, e])), */

};


export function obtenerGrupoActivo(mapaGrupos) {
    for (const grupo of mapaGrupos.values()) {
        if (grupo.estado === true) {
            return grupo;
        }
    }

    return null;
}


menuJuego("mapa")


const prueba = "idUbicacion-1-posicion-00-objeto-12"






const grupoActivo = obtenerGrupoActivo(datosJuego.grupos)
const ubicacionActual = datosJuego.ubicaciones.get(1)


iniciarInterfazFarmeoUbicacion(grupoActivo)






// zona inventada por mi

const colRandom = 1
const filaRandom = 0




/* const consfsdfsd = datosJuego.andalucia.get("1-0-0") */




/* const sdfsdfsdfsdfsf = ubicacionActual.encontrarZonaCreadaAleatoriamente(0, 0);
 */
import { datosJuego } from "../../objeto-juego-completo.js";
import { crearTiempoDesplazamiento } from "../../paginas/mapa/mapa-engranaje.js";
import { TiempoBase } from "../datos-tiempo/clase-tiempo.js";




export class EventoBase {
    constructor(data) {
        this.id_evento = data.id_evento;
        this.tipo = data.tipo


    }



}

class EventoCombate extends EventoBase {
    constructor(data) {
        super(data);

    }

}



export class EventoViaje extends EventoBase {
    constructor(data) {
        super(data);
        this.idUbicacionA = data.idUbicacionA;
        this.idUbicacionB = data.idUbicacionB;
        this.tiempoInicio = data.tiempoInicio; // Timestamp ms (ej: Date.now())
        this.tiempoFin = data.tiempoFin;       // Timestamp ms (ej: Date.now() + duracion)
        this.grupoActual = data.grupoActual;
        this.timerId = null;

        this.iniciar();
    }

    iniciar() {
        // Obtenemos la instancia única global
        this.clock = new TiempoBase();

        // Primer renderizado inmediato
        this.actualizarProgreso();

        if (this.obtenerTiempoRestante() <= 0) {
            this.iniciarELFIN();
            return;
        }

        // Bucle de actualización sincronizado
        this.timerId = setInterval(() => {
            this.actualizarProgreso();
        }, 200); // 200ms para asegurar fluidez visual en la UI
    }

    obtenerTiempoRestante() {
        const restante = this.tiempoFin - Date.now();
        return Math.max(0, restante); // Evitamos valores negativos
    }

    actualizarProgreso() {
        const restante = this.obtenerTiempoRestante();
        this.mostrarTiempo(this.grupoActual.id_grupo, restante);

        if (restante <= 0) {
            this.iniciarELFIN();
        }
    }

    mostrarTiempo(id_grupo, tiempoRestanteMs) {
        const desocultar = document.getElementById(`mostrar-viaje-${id_grupo}`);
        if (desocultar) desocultar.classList.remove("ocultar");

        const contenedor = document.getElementById(`tiempo-viaje-${id_grupo}`);
        if (contenedor) {
            const segundos = Math.ceil(tiempoRestanteMs / 1000);
            contenedor.innerText = `${segundos}s`;
        }
    }

    iniciarELFIN() {
        if (this.timerId) {
            clearInterval(this.timerId);
            this.timerId = null;
        }

        const desocultar = document.getElementById(`mostrar-viaje-${this.grupoActual.id_grupo}`);
        if (desocultar) desocultar.classList.add("ocultar");

        crearTiempoDesplazamiento(this.grupoActual, this.id_evento);
    }
}


export class EventoFactory {
    static crear(array) {
        return array.map(data => {
            switch (data.tipo.toLowerCase()) {
                case "combate":
                    return new EventoCombate(data);

                case "viaje":
                    return new EventoViaje(data);

                default:
                    return new EventoBase(data);
            }
        });
    }
}

const eventosCreados = [
    /*     {
            id_evento: 1,
            tipo: "viaje",
            grupoActual: datosGrupos.find((grupo) => {
                const p = grupo.id_grupo === 1
                return p
            }),
            idUbicacionA: 1,
            idUbicacionB: 7,
            tiempoInicio: Date.now(),
            tiempoFin: Date.now() + 1000
        },
    
        {
            id_evento: 2,
            tipo: "combate",
    
    
    
    
        },
     */


]




export const cantidadEventos = EventoFactory.crear(eventosCreados)
import { datosJuego } from "../../objeto-juego-completo.js";


export class TiempoBase {
    constructor() {
        if (TiempoBase.instance) {
            return TiempoBase.instance; // Patrón Singleton: garantiza una sola instancia global
        }

        this.tiempoAhora = Date.now();
        this.tiempoPasado = 0; // Tiempo transcurrido en el frame actual (en segundos)
        this.EscalaTiempo = 1.0; // 1.0 = velocidad normal, 0 = pausa, 2.0 = doble velocidad
        this.EstaPausado = false;
        this.momentoOculto = 0;

        this.inicializarEscuchaVisibilidad()
        TiempoBase.instance = this;
    }

    /**
     * Inicializa el tiempo y calcula cuántos segundos pasaron mientras la app estuvo cerrada.
     * Función que recibe los segundos offline transcurridos.
     */

    inicializarEscuchaVisibilidad() {
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.momentoOculto = Date.now();
                this.EstaPausado = true; // Opcional: pausar automáticamente
            } else {

                const tiempoFuera = (Date.now() - this.momentoOculto) / 1000;
                this.tiempoEnSegundoPlano = tiempoFuera;

                this.tiempoAhora = Date.now();
                this.EstaPausado = false;

                console.log(`Estuviste fuera ${tiempoFuera.toFixed(2)} segundos.`);
            }
        });
    }

    actualizar() {
        if (this.EstaPausado) return;

        const ahora = Date.now();
        // Convertimos a segundos
        this.tiempoPasado = ((ahora - this.tiempoAhora) / 1000) * this.EscalaTiempo;
        this.tiempoAhora = ahora;
    }


    /**
     * Actualiza el delta de tiempo. Debe llamarse UNA SOLA VEZ dentro de tu bucle/loop principal.
     */


    /**
     * Guarda el timestamp actual en el almacenamiento local.
     */


    /**
     * Eventos automáticos para guardar la referencia al cerrar o cambiar de pestaña.
     */

}

// Exportamos la instancia única lista para usar
export const Clock = new TiempoBase();



import { datosJuego } from "../../../objeto-juego-completo.js";
import { actualizarInventarioIconoFarmearZona } from "../../../paginas/zonas-farmeo/farmeo-interfaz.js";

export class ZonaCreadaAleatoriamenteBase {
    constructor(datos) {
        this.estructuras = datos.estructuras || [];
        this.grid = datos.grid;
        this.id_zona_creada_aleatoriamente = datos.id_zona_creada_aleatoriamente;
        this.inventario = datos.inventario;
        this.inventario_maximo = datos.inventario_maximo;
        this.inventario_zona_actual = datos.inventario_zona_actual;
        this.kg_maximo = datos.kg_maximo;
        this.nivel = datos.nivel;
        this.provincia = datos.provincia;
        this.recursos = datos.recursos;
        this.tipo = datos.tipo;
        this.tipo_ubicacion = datos.tipo_ubicacion;
    }

    encontrarRecurso(idRecurso) {
        const recursos = this.recursos
        const recursoEncontrado = recursos.find((recurso) => {
            const recursoListo = recurso.id_ubicacion === idRecurso
            return recursoListo
        })
        return recursoEncontrado
    }

    incremetarCantidadGenerada(objetoParaFarmear, recursoEncontrado) {
        const estaZona = this;
        const kgmaximoDisponible = this.kg_maximo;
        const cantidadGenerada = objetoParaFarmear.cantidadGenerada;
        const kgObjeto = cantidadGenerada * objetoParaFarmear.kg;
        const inventarioActualKg = this.inventario_zona_actual;


        if (inventarioActualKg + kgObjeto > kgmaximoDisponible) return;

        const objetoRegistrado = datosJuego?.recursos?.get(objetoParaFarmear.id_recurso);
        const stackMaximo = objetoRegistrado?.stacksMaximo || 10;

        let cantidadPorAnadir = cantidadGenerada;

        while (cantidadPorAnadir > 0) {
            const stackIncompleto = estaZona.inventario.find(
                item => item.id_recurso === objetoParaFarmear.id_recurso && item.cantidad < stackMaximo
            );

            if (stackIncompleto) {
                const espacioDisponible = stackMaximo - stackIncompleto.cantidad;

                if (cantidadPorAnadir <= espacioDisponible) {
                    stackIncompleto.cantidad += cantidadPorAnadir;
                    cantidadPorAnadir = 0;
                } else {
                    stackIncompleto.cantidad = stackMaximo;
                    cantidadPorAnadir -= espacioDisponible;
                }

            } else {
                if (estaZona.inventario.length >= estaZona.inventario_maximo) break;

                const cantidadNuevoStack = Math.min(cantidadPorAnadir, stackMaximo);

                estaZona.inventario.push({
                    id_recurso: objetoParaFarmear.id_recurso,
                    cantidad: cantidadNuevoStack,
                });

                cantidadPorAnadir -= cantidadNuevoStack;


            }
        }

        const kgRealmenteSumados = (cantidadGenerada - cantidadPorAnadir) * objetoParaFarmear.kg;
        estaZona.inventario_zona_actual += kgRealmenteSumados;
        recursoEncontrado.cantidad -= cantidadGenerada;
        actualizarInventarioIconoFarmearZona(this);
        this.actualizarInvnetarioTextoFarmearZona(recursoEncontrado);
        this.actualizarInterfazTextoFarmearZona();

        return this.inventario_zona_actual

    }

    actualizarInterfazTextoFarmearZona() {
        const contenedorHTML = document.getElementById(`inventario-texto-actual-${this.id_zona_creada_aleatoriamente}`)
        contenedorHTML.innerText = this.inventario_zona_actual
    }

    actualizarInvnetarioTextoFarmearZona(recursoEncontrado) {
        if (!recursoEncontrado?.id_ubicacion) return;

        const contenedor = document.getElementById(`Recursos-trabajo-${recursoEncontrado.id_ubicacion}`);

        if (contenedor) {
            contenedor.innerText = recursoEncontrado.cantidad;
        }
    }


}
class Norte extends ZonaCreadaAleatoriamenteBase {
    constructor(data) {
        super(data);
    }

}

class Noreste extends ZonaCreadaAleatoriamenteBase {
    constructor(data) {
        super(data);
    }
}

class Este extends ZonaCreadaAleatoriamenteBase {
    constructor(data) {
        super(data);
    }
}
class Sureste extends ZonaCreadaAleatoriamenteBase {
    constructor(data) {
        super(data);
    }
}
class Sur extends ZonaCreadaAleatoriamenteBase {
    constructor(data) {
        super(data);
    }
}
class Suroeste extends ZonaCreadaAleatoriamenteBase {
    constructor(data) {
        super(data);
    }
}
class Oeste extends ZonaCreadaAleatoriamenteBase {
    constructor(data) {
        super(data);
    }
}
class Noroeste extends ZonaCreadaAleatoriamenteBase {
    constructor(data) {
        super(data);
    }
}
class Centro
    extends ZonaCreadaAleatoriamenteBase {
    constructor(data) {
        super(data);
    }
}


export class ZonasAleatoriaFactory {
    static crear(array) {
        return array.map(data => {
            switch (data.tipo.toLowerCase()) {
                case "norte":
                    return new Norte(data);

                case "noreste":
                    return new Noreste(data);

                case "este":
                    return new Este(data);

                case "sureste":
                    return new Sureste(data);

                case "sur":
                    return new Sur(data);

                case "suroeste":
                    return new Suroeste(data);

                case "oeste":
                    return new Oeste(data);

                case "noroeste":
                    return new Noroeste(data);

                case "centro":
                    return new Centro(data);


                default:
                    return new ZonaCreadaAleatoriamenteBase(data);
            }
        });
    }

}




const zonasCreadasAleatoriamente = [



]


export const zonasCreadasAleatoriamentetotal = ZonasAleatoriaFactory.crear(zonasCreadasAleatoriamente);

import { cerrarMenu } from "../../menu/menu-engranaje.js"
import { datosJuego } from "../../objeto-juego-completo.js"

const mostrarMapa = document.getElementById("mostrar-mapa")
const mostrarCasa = document.getElementById("mostrar-casa")
const mostrarCiudad = document.getElementById("mostrar-ciudad")
const mostrarGrupo = document.getElementById("mostrar-grupo")
const mostrarCombate = document.getElementById("mostrar-combate")

class UbicacionBase {
    constructor(data) {
        this.id_ubicacion = data.id_ubicacion;
        this.tipo = data.tipo;
        this.provincia = data.provincia || "andalucia"
        this.nombre = data.nombre;
        this.grid = data.grid;
        this.imagen = data.imagen;
        this.seguridad = data.seguridad || 0;
        this.informacion = data.informacion_ubicacion || "Sin información.";
        this.kg_actual = data.kg_actual || 0
        // Sistema de Inventario
        this.inventarioMaximo = data.inventario_maximo || 10;
        this.kgMaximo = data.kg_maximo || 200;
        this.grupo_actual = data.grupo_actual || null

    }

    // Métodos comunes
    actualizarGrupoUbicacion(idGrupo) {
        this.grupo_actual = idGrupo
    }

    obtenerInfo() {
        return `${this.nombre} (${this.tipo}) - ${this.informacion}`;
    }

    existeEstaUbicacion(cordenadaX, cordenadaY) {
        const buscarg = Array.from(datosJuego.ubicaciones.values()).find((u) => {
            return u.grid.col === cordenadaX && u.grid.fila === cordenadaY;
        });
        return buscarg;
    }

}

class ZonaSegura extends UbicacionBase {
    constructor(data) {
        super(data);
        this.estructuras = data.estructuras || {};
    }
    abrirInterfaz() {

        return

    }
}

class Ciudad extends UbicacionBase {
    constructor(data) {
        super(data);
        // Las ciudades pueden tener su propia economía, NPCs, etc.
        this.recursosDisponibles = data.recursos_disponibles || []; // Lo que venden
    }

    comerciar() {
        return "Bienvenido a la ciudad. ¿Qué deseas comprar o vender?";
    }
    abrirInterfaz() {
        this.actualizarGrupoUbicacion(grupo)

    }
}

class Camino extends UbicacionBase {
    constructor(data) {
        super(data);
    }
}


class ZonaSalvaje extends UbicacionBase {
    constructor(data) {
        super(data);

        this.zonaCreada = data.zonaCreada || false

        // Sistema de Enemigos
        this.nivel_ubicacion_enemiga = data.nivel_ubicacion_enemiga || 1
        this.cantidad_enemigos = data.cantidad_enemigos ? {
            min: data.cantidad_enemigos.min ?? null,
            max: data.cantidad_enemigos.max ?? null,
            nivel_promedio: data.cantidad_enemigos.nivel_promedio ?? null,
        } : null;

        this.zona_enemiga = data.zona_enemiga || null;
        this.enemigo_aqui = data.estaEnemigoAqui || false;

        this.nivel_ubicacion_descubrimiento = data.nivel_ubicacion_descubrimiento || 0
        this.parametrosUbicacion = data.parametrosUbicacion

    }

    // Método para obtener la zona al instante:
    encontrarZona(posicionNumero) {
        const zonaEncontrada = this.recursosDisponibles.find((zona) => zona.posicion === posicionNumero)
        return zonaEncontrada
    }
    encontrarZonaUbicacion() {
        const todasLasZonas = datosJuego[this.provincia]
        return todasLasZonas
    }

    encontrarProvinciaYZona() {
        const todasLasZonas = datosJuego[this.provincia]
        return todasLasZonas
    }


    encontrarZonaCreadaAleatoriamente(col, fila) {
        const construirID = `${this.id_ubicacion}-${col}-${fila}`
        const datosZona = datosJuego[this.provincia].get(construirID)
        return datosZona
    }

    encontrarRecursoTrabajado(idZonaRecurso) {
        const idUbicacion = this.id_ubicacion
        const idObjeto = idZonaRecurso.split("-")[5]

        const numero = idZonaRecurso.split("-")[3]
        const col = numero.split("")[0]
        const fila = numero.split("")[1]

        const idregion = `${idUbicacion}-${col}-${fila}`
        const datosZona = datosJuego[this.provincia]

        const zonaEncontrada = datosZona.get(idregion)

        const crearIDRecurso = `idUbicacion-${this.id_ubicacion}-posicion-${numero}-objeto-${idObjeto}`

        const RecursoEncontrado = zonaEncontrada.encontrarRecurso(crearIDRecurso)

        return RecursoEncontrado

    }


    comprimirZonaRecursos(posicionNumero) {
        const zonaEncontrada = this.encontrarZona(posicionNumero)
        const existeRepetido = this.verificarIDDuplicadoZona(zonaEncontrada.recursos)

        //existeID repetido?
        if (!existeRepetido) {
            return zonaEncontrada.recursos;
        }

        const recursosComprimidos = [];

        for (const item of zonaEncontrada.recursos) {
            const itemExistente = recursosComprimidos.find(
                (objeto) => objeto.id_recurso === item.id_recurso
            );

            if (itemExistente) {
                itemExistente.cantidad += item.cantidad;
            } else {
                recursosComprimidos.push({ ...item });
            }
        }
        return recursosComprimidos;
    }

    encontrarRecursos(idRECURSO) {
        return datosJuego.recursos.get(idRECURSO)
    }

    encontrarRecursos(id) {
        return datosJuego.recursos.get(id)
    }

    obtenerZonaId(id) {
        const zona = datosJuego.zonasEnemigos.get(id)
        return zona
    }

    crearZonaEnemigo(terrenoEnemigo) {
        this.zona_enemiga = terrenoEnemigo
    }

    inyectarZonaCreada(zonaCreada) {
        this.zona_identificada = zonaCreada
    }

    /*  
       ActualizarInventarioActualUbicacion() {
              let cantidadTotal = 0
      
              for (let i = 0; i < this.inventario.length; i++) {
                  const element = this.inventario[i];
      
                  const recurso = this.encontrarRecursos(element.id_recurso)
                  cantidadTotal += recurso.kg * element.cantidad
              }
              this.kg_actual = cantidadTotal
              return cantidadTotal
          } */

    /*     verificarIDDuplicadoZona(zona) {
            const ids = new Set();
            for (const item of zona) {
                if (ids.has(item.id_recurso)) return true;
                ids.add(item.id_recurso);
            }
            return false;
        } */
}


class MapaFactory {
    static crearMapa(arrayUbicaciones) {
        return arrayUbicaciones.map(data => {
            switch (data.tipo.toLowerCase()) {
                case "bosque":
                case "mina":
                case "guarida":
                case "montaña":
                case "rio":
                    return new ZonaSalvaje(data);

                case "casa":
                    return new ZonaSegura(data);

                case "ciudad":
                    return new Ciudad(data);

                case "camino":
                case "vacio":
                    return new Camino(data);

                default:
                    return new UbicacionBase(data);
            }
        })
    }
}


export const ubicaciones = [
    {
        id_ubicacion: 1,
        tipo: "bosque",
        provincia: "andalucia",
        nombre: "Bosque Espeso",
        grid: { col: 1, fila: 3 },
        parametrosUbicacion: {
            ubicaciones: 5,
            enemigoPreferentes: 1,
            recursosGlobalesMaximo: 1000,
            recursosMax: 250,
            recursosMinimo: 200,
            zonas: {
                montana: 2,
                bosque: 12,
                agua: 2
            }
        },
        zona_identificada: null,
        estructuras: [],
        seguridad: 8,
        imagen: "src/img/ubicaciones/arbol.webp",
        kg_maximo: 250,
        inventario_maximo: 10,
        cantidad_enemigos: {
            min: 1,
            max: 3,
            nivel_promedio: 5
        },
        enemigo_aqui: false,
        zona_enemiga: null,
        informacion_ubicacion: "Lugar para farmear del campo y darle caña",
        grupo_actual: 1

    },
    {
        id_ubicacion: 2,
        tipo: "ciudad",
        nombre: "Ciudad Agua",

        grid: { col: 2, fila: 0 },

        inventario: [
            { id_recurso: 1, cantidad: 50, },
            { id_recurso: 2, cantidad: 2, },
            { id_recurso: 12, cantidad: 50, },
            { id_recurso: 22, cantidad: 2, },
            { id_recurso: 11, cantidad: 50, },
            { id_material: 1, cantidad: 2, },
            { id_material: 2, cantidad: 2, },
            { id_material: 0, cantidad: 233, },
        ],

        estructuras: [],
        seguridad: 8,
        imagen: "src/img/ubicaciones/ciudad.png",
        nivel_capacidad_recurso: 1,
        kg_maximo: 200,
        inventario_maximo: 10,
        zona_enemiga: [],
        estaEnemigoAqui: false,

        informacion_ubicacion: "Lugar para farmear del campo y darle caña"

    },
    {
        id_ubicacion: 3,
        tipo: "vacio",
        nombre: "Mina singular",
        grid: { col: 0, fila: 1 },
        inventario: [],
        recursos_disponibles: [],
        inventario: [

            { id_recurso: 12, cantidad: 30 },
            { id_recurso: 1, cantidad: 10 },
            { id_recurso: 2, cantidad: 25 },

        ],
        recursos_disponibles: [
            { id_recurso: 12, cantidad: 45, },
            { id_recurso: 1, cantidad: 2, },
            { id_recurso: 2, cantidad: 2 },
            { id_recurso: 11, cantidad: 3 },
        ],
        estructuras: [],
        seguridad: 0.8,
        imagen: "src/img/ubicaciones/mina.webp",
        nivel_capacidad_recurso: 1,
        kg_maximo: 200,
        estaEnemigoAqui: false,

        inventario_maximo: 10,
        zona_enemiga: [],
    },
    {
        id_ubicacion: 4,
        tipo: "casa",
        nombre: "casa TUYA",
        grid: { col: 0, fila: 2 },
        inventario: [
            { id_material: 0, cantidad: 10 },
            { id_recurso: 1, cantidad: 140 },
            { id_recurso: 2, cantidad: 150 },
            { id_objeto: 1, cantidad: 1 },
        ],
        recursos_disponibles: [],
        estructuras: {
            casa: {
                nivel: 0,
                habitaciones: 2,
                mejoras: ["cama_madera"],
                construida: false
            },
            cocina: {
                nivel: 0,
                recetas_desbloqueadas: [],
                recipientes: 1
            }
        },
        seguridad: 0.8,
        imagen: "src/img/ubicaciones/casa.webp",
        nivel_capacidad_recurso: 1,
        kg_maximo: 200,
        inventario_maximo: 7,
        estaEnemigoAqui: false,
        zona_enemiga: [],
    },
    {
        id_ubicacion: 5,
        tipo: "montaña",
        nombre: "montaña",
        grid: { col: 0, fila: 3 },
        inventario: [],
        recursos_disponibles: [],
        estructuras: {},
        seguridad: 0.8,
        imagen: "src/img/ubicaciones/montaña.webp",
        nivel_capacidad_recurso: 1,
        kg_maximo: 200,
        inventario_maximo: 10,
        zona_enemiga: [],
        estaEnemigoAqui: false,

    },

    {
        id_ubicacion: 6,
        tipo: "rio",
        nombre: "rio",
        grid: { col: 1, fila: 2 },
        inventario: [],
        recursos_disponibles: [],
        estructuras: {},
        seguridad: 0.8,
        imagen: "src/img/ubicaciones/rio.png",
        nivel_capacidad_recurso: 1,
        kg_maximo: 200,
        inventario_maximo: 10,
        zona_enemiga: [],
        estaEnemigoAqui: false,

    },
    {
        id_ubicacion: 7,
        tipo: "camino",
        nombre: "camino",
        grid: { col: 2, fila: 2 },
        inventario: [],
        recursos_disponibles: [],
        estructuras: {},
        seguridad: 0.8,
        imagen: "src/img/ubicaciones/camino.jpg",
        nivel_capacidad_recurso: 1,
        kg_maximo: 200,
        inventario_maximo: 10,
        zona_enemiga: [],
        estaEnemigoAqui: false,

    },
    {
        id_ubicacion: 8,
        tipo: "camino",
        nombre: "camino",
        grid: { col: 2, fila: 1 },
        inventario: [],
        recursos_disponibles: [],
        estructuras: {},
        seguridad: 0.8,
        imagen: "src/img/ubicaciones/camino.jpg",
        nivel_capacidad_recurso: 1,
        kg_maximo: 200,
        inventario_maximo: 10,
        zona_enemiga: [],
        estaEnemigoAqui: false,

    },
    {
        id_ubicacion: 10,
        tipo: "camino",
        nombre: "camino",
        grid: { col: 1, fila: 0 },
        inventario: [],
        recursos_disponibles: [],
        estructuras: {},
        seguridad: 0.8,
        imagen: "src/img/ubicaciones/camino.jpg",
        nivel_capacidad_recurso: 1,
        kg_maximo: 200,
        inventario_maximo: 10,
        zona_enemiga: [],
        estaEnemigoAqui: false,

    },
    {
        id_ubicacion: 11,
        tipo: "camino",
        nombre: "camino",
        grid: { col: 1, fila: 1 },
        inventario: [],
        recursos_disponibles: [],
        estructuras: {},
        seguridad: 0.8,
        imagen: "src/img/ubicaciones/camino.jpg",
        nivel_capacidad_recurso: 1,
        kg_maximo: 200,
        inventario_maximo: 10,
        zona_enemiga: [],
        estaEnemigoAqui: false,

    },
    {
        id_ubicacion: 12,
        tipo: "Guarida",
        nombre: "Guarida de la noche",
        grid: { col: 2, fila: 3 },
        inventario: [],
        recursos_disponibles: [],
        estructuras: {},
        seguridad: 0.8,
        imagen: "src/img/ubicaciones/guarida.jpg",
        nivel_capacidad_recurso: 1,
        kg_maximo: 200,
        inventario_maximo: 10,
        zona_enemiga: [],
        estaEnemigoAqui: false,

    },

]



export const mapaDelJuego = MapaFactory.crearMapa(ubicaciones);



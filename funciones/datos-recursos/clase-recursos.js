export class RecursoClass {
    constructor(datos) {
        // Identificador clave
        this.id_recurso = datos.id_recurso;

        // Propiedades del recurso
        this.nombre = datos.nombre;
        this.trabajo = datos.trabajo;
        this.xp = datos.xp || 0;
        this.segundos = datos.segundos || 1;
        this.recurso = datos.recurso || 1;
        this.nivelDeEsteRecurso = datos.Nivel_De_este_recurso || 1;
        this.imagen = datos.imagen;
        this.dinero = datos.dinero || 0;
        this.kg = datos.kg || 1;
        this.cantidadGenerada = datos.cantidad_generada || 1;
        this.puntuacionFarmeo = datos.puntuacion_farmeo || 0;
        this.fondoPantalla = datos.fondoPantalla || null
        this.requisito = datos.requisito || [];
        this.stacksMaximo = datos.stacksMaximo || 11
    }

    actualizarPropiedades(nuevosDatos) {
        Object.assign(this, nuevosDatos);
    }
}

class Recurso extends RecursoClass {
    constructor(data) {
        super(data);
    }

}

class Material extends RecursoClass {
    constructor(data) {
        super(data);
    }
}


class RecursosFactory {
    static crear(array) {
        return array.map(data => {
            switch (data.tipo.toLowerCase()) {
                case "recurso":
                    return new Recurso(data);

                case "material":
                    return new Material(data);

                default:
                    return new RecursoClass(data);
            }
        });
    }
}


export const recursosGlobales = [
    {
        id_recurso: 1,
        tipo: "recurso",
        trabajo: "talar",
        nombre: "madera",
        xp: 1,
        segundos: 1,
        recurso: 1,
        Nivel_De_este_recurso: 1,
        imagen: "./src/img/madera1.png",
        dinero: 40,
        kg: 1,
        cantidad_generada: 10,
        puntuacion_farmeo: 1,

    },
    {

        id_recurso: 2,
        tipo: "recurso",
        trabajo: "talar",
        nombre: "roble",
        xp: 2,
        segundos: 2,
        recurso: 1,
        Nivel_De_este_recurso: 1,
        imagen: "./src/img/roble.png",
        dinero: 40,
        kg: 1,
        cantidad_generada: 10,
        puntuacion_farmeo: 20,

    },
    {
        id_recurso: 11,
        tipo: "recurso",
        trabajo: "minar",
        nombre: "Carbon",
        xp: 2,
        segundos: 1,
        recurso: 1,
        Nivel_De_este_recurso: 1,
        imagen: "./src/img/carbon.png",
        dinero: 40,
        kg: 1,
        cantidad_generada: 5,
        puntuacion_farmeo: 43,

    },
    {
        id_recurso: 12,
        tipo: "recurso",
        trabajo: "minar",
        nombre: "bronce",
        xp: 2,
        segundos: 3,
        recurso: 1,
        Nivel_De_este_recurso: 1,
        imagen: "./src/img/bronce.png",
        dinero: 40,
        kg: 1,
        cantidad_generada: 1,
        puntuacion_farmeo: 4,

    },

    {
        id_recurso: 21,
        tipo: "recurso",
        trabajo: "serradero",
        nombre: "tabla",
        xp: 2,
        segundos: 1,
        recurso: 1,
        Nivel_De_este_recurso: 1,
        imagen: "./src/img/tabla.png",
        dinero: 40,
        requisito: [
            { id_recurso: 11, cantidad: 1 },
            { id_recurso: 1, cantidad: 1 }
        ],
        kg: 1,
        cantidad_generada: 1,
        puntuacion_farmeo: 0,
    },
    {
        id_recurso: 22,
        trabajo: "serradero",
        tipo: "recurso",
        nombre: "tabla con pincho",
        xp: 12,
        segundos: 3,
        recurso: 1,
        Nivel_De_este_recurso: 1,
        imagen: "./src/img/tabla-reforzado.png",
        dinero: 40,
        requisito: [
            { id_recurso: 12, cantidad: 1 },
            { id_recurso: 11, cantidad: 1 },
            { id_recurso: 2, cantidad: 1 },
            { id_recurso: 21, cantidad: 1 },
            { id_recurso: 1, cantidad: 1 }
        ],
        kg: 1,
        cantidad_generada: 1,
        puntuacion_farmeo: 0,
    },


    {
        id_recurso: 31,
        tipo: "material",
        trabajo: "carpinteria",
        nombre: "madera reforzada",
        xp: 1,
        segundos: 1,
        recurso: 1,
        Nivel_De_este_recurso: 1,
        imagen: "./src/img/materiales/madera_reforzada.png",
        dinero: 20,
        kg: 1,
        cantidad_generada: 1,
        puntuacion_crafteo: 1,
    },
    {
        id_recurso: 32,
        tipo: "material",
        trabajo: "forja",
        nombre: "clavo",
        xp: 1,
        segundos: 1,
        recurso: 1,
        Nivel_De_este_recurso: 1,
        imagen: "./src/img/materiales/clavo.png",
        dinero: 43,
        kg: 1,
        cantidad_generada: 10,
        puntuacion_crafteo: 1,
    },
    {
        id_recurso: 33,
        tipo: "material",
        trabajo: "forja",
        nombre: "lingote de hierro",
        xp: 1,
        segundos: 1,
        recurso: 1,
        Nivel_De_este_recurso: 1,
        imagen: "./src/img/materiales/lingote_hierro.png",
        dinero: 20,
        kg: 1,
        cantidad_generada: 1,
        puntuacion_crafteo: 1,
    },


]


export const cantidadRecursos = RecursosFactory.crear(recursosGlobales);

import { Conexion } from "./conexion";

export class Nodo {
    id: number = 0;
    nombre: string = "";
    tipo: string = "";
    nodosConectados: Conexion[] = [];

    constructor(
            id: number, 
            nombre:string, 
            tipo:string, 
            nodosConectados: Conexion[]
        ) {
        this.id = id;
        this.nombre = nombre;
        this.tipo = tipo;
        this.nodosConectados = nodosConectados;
    }
}

export class NodoVista extends Nodo {
    x: number = 0;
    y: number = 0;
    color: string = "";
    centroX: number = 0;
    centroY: number = 0;
    texto: string = "";
    visible: boolean = false;
    
    constructor(
            id: number, 
            nombre:string, 
            tipo:string, 
            nodosConectados: Conexion[],
            x: number,
            y: number,
            centroX: number,
            centroY: number,
            texto: string,
            visible: boolean,
            color: string
        ) {
        super(id, nombre, tipo, nodosConectados);
        this.x = x;
        this.y = y;
        this.centroX = centroX;
        this.centroY = centroY;
        this.texto = texto;
        this.visible = visible;
        this.color = color;
    }
}

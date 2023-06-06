export class Conexion {
    id: number = 0;
    valor:number = 0;
    peso: number = 0;
    nodoInicio: number = 0;
    nodoFin: number = 0;

    constructor(
            id: number, 
            valor: number, 
            peso: number, 
            nodoInicio: number, 
            nodoFin:number
        ){
        this.id = id;
        this.valor = valor;
        this.peso = peso;
        this.nodoInicio = nodoInicio;
        this.nodoFin = nodoFin;
    }
}

export class ConexionVista extends Conexion {
    startX:number = 0;
    startY:number = 0;
    endX:number = 0;
    endY:number = 0;
    text:string = "";
    visible:boolean = false;

    constructor(
            id: number, 
            valor: number, 
            peso: number, 
            nodoInicio: number, 
            nodoFin:number,
            startX: number,
            startY: number,
            endX: number,
            endY: number,
            text: string,
            visible: boolean
        ){
        super(id, valor,peso, nodoInicio, nodoFin);
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
        this.text = text;
        this.visible = visible;
    }
}
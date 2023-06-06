import { Component, ElementRef, ViewChild, AfterViewInit, OnInit  } from '@angular/core';
import { ServicoGlobalService } from './Services/servico-global.service';
import { Nodo, NodoVista } from './Models/nodo';
import { ConexionVista } from './Models/conexion';
import { MatDialog } from '@angular/material/dialog';
import { ModalCrearNodoComponent } from './Components/modal-crear-nodo/modal-crear-nodo.component';
import { Rutas } from './Models/rutas';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnInit{
  title = 'Dijkstra';
  @ViewChild('divContainer', { static: true }) divContainer!: ElementRef;
  nodosVista: NodoVista[] = [];
  conexiones: ConexionVista[] = [];
  containerWidth: number = 0;
  containerHeight: number = 0;
  nodoInicio: NodoVista = new NodoVista(0,"","",[],0,0,0,0,"",false,"");
  nodoFin: NodoVista = new NodoVista(0,"","",[],0,0,0,0,"",false,"");
  primerNodo: boolean = true;
  ruta: Rutas = new Rutas();

  constructor(private service: ServicoGlobalService,
    public dialog: MatDialog){}

  ngOnInit(): void {
    this.ObtenerNodos();
  }

  ObtenerNodos(): void{
    this.nodosVista = [];
    this.conexiones = [];
    this.service.GetNodos().subscribe(nodos => {
      this.generarNodos(nodos,this.containerWidth, this.containerHeight);
      this.generarConexiones();
    });
  }

  ngAfterViewInit(): void {
    this.containerWidth = this.divContainer.nativeElement.offsetWidth;
    this.containerHeight = this.divContainer.nativeElement.offsetHeight;
  }

  abrirModalCrearNodo(): void {
    let referenciaModal = this.dialog.open(ModalCrearNodoComponent);
    referenciaModal.afterClosed().subscribe(
      respuesta =>{
        if (respuesta == true) this.ObtenerNodos();
      }
    );
  }

  generarConexiones(){
    this.nodosVista.forEach(nodo => {
      nodo.nodosConectados.forEach(nodoConectado => {
        let conexionVista = this.conexiones.find(conexion => conexion.id == nodoConectado.id);
        if(conexionVista == undefined){
          let nodoVistaFin = this.nodosVista.find(nodoVista => nodoVista.id == nodoConectado.nodoFin);
          nodoVistaFin = nodoVistaFin == undefined ? new NodoVista(0,"","",[],0,0,0,0,"",false,"") : nodoVistaFin;
          conexionVista = new ConexionVista(
            nodoConectado.id,
            nodoConectado.valor,
            nodoConectado.peso,
            nodoConectado.nodoInicio,
            nodoConectado.nodoFin,
            nodo.centroX,
            nodo.centroY,
            Number.parseInt((nodoVistaFin?.centroX)?.toString()),
            Number.parseInt((nodoVistaFin?.centroY)?.toString()),
            "P: "+nodoConectado.peso+" V: "+nodoConectado.valor,
            false
          );

          if(conexionVista.startX == conexionVista.endX){
            nodoVistaFin = this.nodosVista.find(nodoVista => nodoVista.id == nodoConectado.nodoInicio);
            nodoVistaFin = nodoVistaFin == undefined ? new NodoVista(0,"","",[],0,0,0,0,"",false,"") : nodoVistaFin;
            conexionVista.endX = Number.parseInt((nodoVistaFin?.centroX)?.toString());
            conexionVista.endY =  Number.parseInt((nodoVistaFin?.centroY)?.toString());
          }
          this.conexiones.push(conexionVista); 
        }
      });
    });
  }

  generarNodos(nodos: Nodo[], containerWidth: number, containerHeight: number){

    for(let i = 0; i<nodos.length; i++) {
      const nodoVista: NodoVista = new NodoVista(
        nodos[i].id,
        nodos[i].nombre,
        nodos[i].tipo,
        nodos[i].nodosConectados,
        this.obtenerCoordenadaRandom(containerWidth - 100),
        this.obtenerCoordenadaRandom(containerHeight - 100),
        0,
        0,
        nodos[i].nombre[0],
        false,
        this.obtenerColorRandom()
      );
      nodoVista.centroX = nodoVista.x+25;
      nodoVista.centroY = nodoVista.y+25;
      if(this.verificarDistanciaMinima(nodoVista)){
        this.nodosVista.push(nodoVista);
      }else{
        i--;
      }
    };
  }

  obtenerCoordenadaRandom(max: number): number{
    return Math.floor(Math.random()*max);
  }

  obtenerColorRandom(): string{
    const letters = '0123456789ABCDEF';
    let color = '#';
    for(let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random()*16)];
    }
    return color;
  }

  verificarDistanciaMinima(newNodoVista: NodoVista): boolean {
    for(const nodoVista of this.nodosVista) {
      const distancia = Math.sqrt(
        Math.pow(nodoVista.x - newNodoVista.x, 2) + 
        Math.pow(nodoVista.y - newNodoVista.y, 2)
      );
      if(distancia < 50) return false;
    };
    return true;
  }

  indicarNodoRutas(id: number): void {
    let nodo = this.nodosVista.find(nodo => nodo.id == id);
    if(this.primerNodo){
      this.nodoInicio = nodo == undefined ? new NodoVista(0,"","",[],0,0,0,0,"",false,"") : nodo;
    }else{
      this.nodoFin = nodo == undefined ? new NodoVista(0,"","",[],0,0,0,0,"",false,"") : nodo;
    }
    this.primerNodo = !this.primerNodo;
  }

  calcularRuta(){
    this.service.CalcularRutas(this.nodoInicio.id, this.nodoFin.id).subscribe(data => {
      this.ruta = data;
      this.ocultarOtrosNodos("Peso");
    })
  }

  ocultarOtrosNodos(tipo: string){
    this.mostrarGrafo();
    this.nodosVista.forEach(nodo => {
      let nodoEncontrado = tipo == "Peso" ? this.ruta.ByPeso.find(nodoR => nodoR.id == nodo.id) : this.ruta.byValor.find(nodoR => nodoR.id == nodo.id);
      if(nodoEncontrado == undefined){
        nodo.visible = true;
        this.ocultarOtrasConexiones(nodo.id, tipo);
      }else{
        let indice = tipo == "Peso" ? this.ruta.ByPeso.findIndex(nodoR => nodoR.id == nodo.id) : this.ruta.byValor.findIndex(nodoR => nodoR.id == nodo.id);
        console.log(indice);
        nodo.texto = nodo.texto[0]+" ("+indice+")";
      }
    });
  }

  mostrarGrafo(){
    this.nodosVista.forEach(nodo => {nodo.visible = false; nodo.texto = nodo.nombre[0]});
    this.conexiones.forEach(conexion => conexion.visible = false)
  }

  ocultarOtrasConexiones(id: number, tipo: string): void {
    this.conexiones.forEach(conexion => {
      if (conexion.nodoFin == id || conexion.nodoInicio == id) {
        conexion.visible = true;
      }
    });
  }
}

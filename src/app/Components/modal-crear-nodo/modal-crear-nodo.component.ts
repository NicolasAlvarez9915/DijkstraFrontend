import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Nodo, NodoVista } from 'src/app/Models/nodo';
import { ServicoGlobalService } from 'src/app/Services/servico-global.service';
import { Conexion } from 'src/app/Models/conexion';

@Component({
  selector: 'app-modal-crear-nodo',
  templateUrl: './modal-crear-nodo.component.html',
  styleUrls: ['./modal-crear-nodo.component.scss']
})
export class ModalCrearNodoComponent {

  titulo: string = "Crear Nodo";
  textoBtn: string = "Crear Nodo";
  nodo: Nodo;
  conexion: Conexion;
  nodoCreado: boolean = false;
  nodos: Nodo[] = [];
  cargandoNodos: string = "Cargando Nodos";
  nodoConectado: boolean = false;

  formularioCrearNodo: FormGroup = this.formBuilder.group({});
  formularioCrearConexion: FormGroup = this.formBuilder.group({});
  constructor(public dialogRef: MatDialogRef<ModalCrearNodoComponent>,
    private formBuilder: FormBuilder,
    private service: ServicoGlobalService) {
      this.nodo = new Nodo(
        0,
        "",
        "",
        []
      );
      this.conexion = new Conexion(
        0,
        0,
        0,
        0,
        0
      );
      this.buildForm();
      this.buildFormConexion();
      this.getNodos();
  }

  getNodos(){
    this.service.GetNodos().subscribe(nodos => {
      this.cargandoNodos = "";
      this.nodos = nodos;
    });
  }
  private buildForm() {
    this.nodo = new Nodo(
      0,
      "",
      "Terrestre",
      []
    );

    this.formularioCrearNodo = this.formBuilder.group({
      tipo: [this.nodo.tipo, Validators.required],
      nombre: [this.nodo.nombre, Validators.required]
    });
  }

  private buildFormConexion() {
    this.conexion = new Conexion(
      0,
      0,
      0,
      0,
      0
    );

    this.formularioCrearConexion = this.formBuilder.group({
      valor: [this.conexion.valor, Validators.required],
      peso: [this.conexion.peso, Validators.required]
    });
  }

  get control() {
    return this.formularioCrearNodo.controls;
  }

  crearNodo(){
    if(!this.nodoCreado){
      if (this.formularioCrearNodo.invalid) {
        return;
      }               
      this.nodo = this.formularioCrearNodo.value;
      this.service.AddNodo(this.nodo).subscribe(
        respuesta => {
          debugger
          this.nodo = respuesta.nodo;
          this.titulo = "Añadir conexiones";
          this.textoBtn = "Aceptar";
          this.nodoCreado = true;
          return;
        }
      )
    }
    if(this.nodoConectado){
      this.dialogRef.close(true);
    }
  }

  enlazarNodos(idNodo: number): void {
    if (this.formularioCrearNodo.invalid) {
      return;
    }               
    this.conexion = this.formularioCrearConexion.value;
    this.conexion.nodoFin = idNodo;
    this.conexion.nodoInicio = this.nodo.id;
    this.service.AddConexion(this.conexion).subscribe(
      respuesta => {
        this.nodoConectado = true;
        return;
      }
    )
  }
}

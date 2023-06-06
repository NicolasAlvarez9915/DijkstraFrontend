import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Nodo } from '../Models/nodo';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Conexion } from '../Models/conexion';
import { Rutas } from '../Models/rutas';

@Injectable({
  providedIn: 'root'
})
export class ServicoGlobalService {

  private baseUrl = 'https://dijkstrabackend-production.up.railway.app/';
  constructor(private http: HttpClient) { }

  GetNodos(): Observable<Nodo[]>{
    return this.http.get<Nodo[]>(this.baseUrl+'api/v1/GetNodos').pipe(
      map(response => {return response})
    );
  }

  AddNodo(nodo: Nodo): Observable<any>{
    return this.http.post<any>(this.baseUrl+'api/v1/AddNodo',nodo).pipe(
      map(response => {return response})
    );
  }

  AddConexion(conexion: Conexion): Observable<Conexion>{
    return this.http.post<Conexion>(this.baseUrl+'api/v1/AddConnectionNodo',conexion).pipe(
      map(response => {return response})
    );
  }

  CalcularRutas(nodoInicio: number, nodoFin: number): Observable<Rutas> {
    return this.http.get<Rutas>(this.baseUrl +'api/v1/CalculateRutas/'+nodoInicio+'/'+nodoFin).pipe(
      map(response => {return response})
    )
  }
}

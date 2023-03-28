import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tarea } from '../models/tareas';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  url = 'http://localhost:4000/api/task/';
  constructor(private http: HttpClient) { }


  getTareas(): Observable<any> {
    return this.http.get(this.url)
  }
  guardarTarea(tarea: Tarea): Observable<any> {
    return this.http.post(this.url, tarea)
  }
  
  eliminarTareas(id: string): Observable<any> {
    return this.http.delete(this.url + id);
  }
  obtenerTarea(id: string): Observable<any> {
    return this.http.get(this.url + id);
  }
}

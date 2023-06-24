import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  obtenerHistoricos(
    opcion: number,
    fechaInicial: string,
    fechaFinal: string
  ): Observable<any> {
    const url = `${this.apiUrl}/historicos?opcion=${opcion}&fechaInicial=${fechaInicial}&fechaFinal=${fechaFinal}`;
    return this.http.get(url);
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';

@Injectable({
  providedIn: 'root'
})
export class TemaService {

  constructor(
    private http: HttpClient
  ) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  getAllTema(): Observable<Tema[]> {
    return this.http.get<Tema[]>('https://blogpessoalantonio.herokuapp.com/temas/todos', this.token)
  }   

  getByIdTema(id: number): Observable<Tema> {
    return this.http.get<Tema>(`https://blogpessoalantonio.herokuapp.com/temas/id/${id}`, this.token)
  }
  
  postTema(tema: Tema): Observable<Tema> {
    return this.http.post<Tema>('https://blogpessoalantonio.herokuapp.com/temas/cadastrar', tema, this.token)
  }

  putTema(id: number, tema: Tema): Observable<Tema> {
    return this.http.put<Tema>(`https://blogpessoalantonio.herokuapp.com/temas/atualizar/${id}`, tema, this.token)
  }

  deleteTema(id: number) {
    return this.http.delete(`https://blogpessoalantonio.herokuapp.com/temas/deletar/${id}`, this.token)
  }
}

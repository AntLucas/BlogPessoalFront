import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';

@Injectable({
  providedIn: 'root'
})
export class PostagemService {

  constructor(
    private http: HttpClient
  ) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  getByIdPostagem(id: number): Observable<Postagem>{
    return this.http.get<Postagem>(`https://blogpessoalantonio.herokuapp.com/postagens/id/${id}`,  this.token)
  }

  getAllPostagens(): Observable<Postagem[]> {
    return this.http.get<Postagem[]>('https://blogpessoalantonio.herokuapp.com/postagens/todos', this.token)
  }

  postPostagem(idUsuario: number, novaPostagem: Postagem) {
    return this.http.post<Postagem>(`https://blogpessoalantonio.herokuapp.com/postagens/salvar/${idUsuario}`, novaPostagem, this.token)
  }

  putPostagem(id: number, postagem: Postagem): Observable<Postagem>{
    return this.http.put<Postagem>(`https://blogpessoalantonio.herokuapp.com/postagens/atualizar/${id}`, postagem, this.token)
  }

  deletePostagem(id: number): Observable<string> {
    return this.http.delete<string>(`https://blogpessoalantonio.herokuapp.com/postagens/deletar/${id}`, this.token) 
  }
}

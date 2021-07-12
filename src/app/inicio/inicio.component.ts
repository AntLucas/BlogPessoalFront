import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { User } from '../model/User';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  postagem: Postagem = new Postagem()
  listaPostagens: Postagem[]
  tituloPost: string

  listaTemas: Tema[]
  idTema: number
  tema: Tema = new Tema()
  nomeTema: string

  user: User = new User()
  idUser: number = environment.idUsuario

  key = 'data'
  reverse = true

  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private temaService: TemaService,
    private authService: AuthService,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
    if (environment.token == '' )  {
      this.router.navigate(['/entrar'])
    }
    this.getAllTemas()
    this.getAllPostagens()
    this.authService.refreshToken()
  }

  findByIdUser() {
    this.authService.refreshToken()
    this.authService.getByIdUser(this.idUser).subscribe((resp: User) => {
      this.user = resp
      console.log(this.user.postagens)
    })
  }

  getAllTemas() {
    this.temaService.getAllTema().subscribe((resp: Tema[]) => {
      this.listaTemas = resp
    })
  }

  getAllPostagens() {
    this.postagemService.getAllPostagens().subscribe((resp: Postagem[]) => {
      this.listaPostagens = resp
    })
  }

  publicar() {
    this.tema.id = this.idTema
    this.postagem.tema = this.tema
    this.user.idUsuario = this.idUser
    this.postagem.usuarioPostagem = this.user

    this.postagemService.postPostagem(this.idUser, this.postagem).subscribe((resp: Postagem) => {
      this.postagem = resp
      this.alertas.showAlertSuccess('Postagem realizada com sucesso!')

      this.postagem = new Postagem()
      this.getAllPostagens()
    })
  }

  findByIdTema() {
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema) => {
      this.tema = resp
    })
  }

  findByTituloPostagem() {

    if (this.tituloPost == '') {

      this.getAllPostagens()

    } else {

      this.postagemService.getByTituloPostagem(this.tituloPost).subscribe((resp: Postagem[]) => {
        this.listaPostagens = resp
      })

    }
    
  }

  findByNomeTema() {

    if (this.nomeTema == '') {

      this.getAllTemas

    } else {

      this.temaService.getByNomeTema(this.nomeTema).subscribe((resp: Tema[]) => {
        this.listaTemas = resp
      })

    }

  }

}

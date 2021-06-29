import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UserLogin } from '../model/UserLogin';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css']
})
export class EntrarComponent implements OnInit {

  userLogin: UserLogin = new UserLogin

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    window.scroll(0,0)
  }

  entrar() {
    this.authService.entrar(this.userLogin).subscribe((resp: UserLogin) => {
      this.userLogin = resp

      environment.token = this.userLogin.token
      environment.urlImage = this.userLogin.urlImage
      environment.nome = this.userLogin.nome
      environment.email = this.userLogin.email
      environment.idUsuario = this.userLogin.idUsuario

      console.log(environment.token)
      console.log(environment.urlImage)
      console.log(environment.nome)
      console.log(environment.email)
      console.log(environment.idUsuario)

      this.router.navigate(['/inicio'])
    }, erro => {
      if(erro.status == 500) {
        alert('Usuário ou senha estão incorretos')
      }
    })
  }
}

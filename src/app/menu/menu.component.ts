import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  nome = environment.nome
  foto = environment.urlImage
  id = environment.idUsuario

  constructor(
    private router: Router
  ) { }

  ngOnInit(){
  }

  sair() {
    this.router.navigate(['/entrar'])
    environment.token = ''
    environment.email = ''
    environment.idUsuario = 0
    environment.nome = ''
    environment.senha = ''
    environment.urlImage = ''
  }

}

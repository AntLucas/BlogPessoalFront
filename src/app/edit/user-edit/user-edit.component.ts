import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  user: User = new User()
  idUser: number
  confirmarSenha: string
  tipoUsuario: string

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    if (environment.token == '' )  {
      this.router.navigate(['/entrar'])
    }
    window.scroll(0,0)

    this.idUser = this.route.snapshot.params['id']
    this.findByIdUser(this.idUser)
  }

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value
  }

  tipoUser(event: any) {
    this.tipoUsuario = event.target.value
  }
  

  // atualizar() {
  //   this.user.tipo = this.tipoUsuario

  //   if(this.user.senha != this.confirmarSenha) {
  //     alert('As senhas estão diferentes.')
  //   } else {
  //     this.authService.atualizarUser(this.idUser, this.user).subscribe((resp: User) => {
  //       this.user = resp
        
  //       this.router.navigate(['/entrar'])
  //       alert('Usuário atualizado com sucesso, faça o login novamente')
  //       environment.token = ''
  //       environment.email = ''
  //       environment.idUsuario = 0
  //       environment.nome = ''
  //       environment.senha = ''
  //       environment.urlImage = ''
        
  //     }, erro => {
  //       console.log(this.user.email)
  //       console.log(this.user.idUsuario)
  //       console.log(this.user.nome)
  //       console.log(this.user.postagens)
  //       console.log(this.user.senha)
  //       console.log(this.user.tipo)
  //       console.log(this.user.urlImage)
  //     })
  //   }
  // }


  atualizar() {
    this.user.tipo = this.tipoUsuario

    if(this.user.senha != this.confirmarSenha) {
      alert('As senhas estão diferentes.')
    } else {
      this.authService.cadastrar(this.user).subscribe((resp: User) => {
        this.user = resp
        
        this.router.navigate(['/entrar'])
        alert('Usuário atualizado com sucesso, faça o login novamente')
        environment.token = ''
        environment.email = ''
        environment.idUsuario = 0
        environment.nome = ''
        environment.senha = ''
        environment.urlImage = ''
        
      }, erro => {
        console.log(this.user.email)
        console.log(this.user.idUsuario)
        console.log(this.user.nome)
        console.log(this.user.postagens)
        console.log(this.user.senha)
        console.log(this.user.tipo)
        console.log(this.user.urlImage)
      })
    }
  }

  findByIdUser(id: number) {
    this.authService.getByIdUser(id).subscribe((resp: User) => {
      this.user = resp
    })
  }

}

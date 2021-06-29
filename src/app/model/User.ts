import { Postagem } from "./Postagem"

export class User{
   public idUsuario: number
   public nome: string
   public email: string
   public senha: string
   public urlImage: string
   public tipo: string
   public postagens: Postagem
}
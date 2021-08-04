import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../domain/usuario';
import { UsuariosService } from '../services/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario: Usuario = new Usuario();
  usuario2: Usuario = new Usuario();

  constructor(private usuarioService: UsuariosService,
    private route:Router) { }

  ngOnInit() {
  }

  async login(){
    const correo = this.usuario.correo
    const clave = this.usuario.clave
    this.usuarioService.findUser(correo, clave).subscribe(data=>{
      console.log(data[0])
      this.usuario2=data[0]
      try{
        if(this.usuario2.correo==correo && this.usuario2.clave==clave && this.usuario2.rol=='agente'){
          this.route.navigate(['agente']);
        }else if(this.usuario2.correo==correo && this.usuario2.clave==clave && this.usuario2.rol=='cliente'){
          this.route.navigate(['cliente']);
        }
      }
      catch(error){console.log('Error: ->', error);
        this.route.navigate(['login']);}
    });
  }
}

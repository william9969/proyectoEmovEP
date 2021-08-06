import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
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
    private route:Router, private afAuth: AngularFireAuth) { }

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
          this.route.navigate(['privado/principal']);
        }else if(this.usuario2.correo==correo && this.usuario2.clave==clave && this.usuario2.rol=='cliente'){
          this.route.navigate(['publico/principal']);
        }
      }
      catch(error){console.log('Error: ->', error);
        this.route.navigate(['login']);}
    });
  }

  async loginGoogle(){
    console.log("Entro en el logueo de google")

    const user = await this.afAuth.signInWithPopup(new firebase.default.auth.GoogleAuthProvider());

    const nombre = user.additionalUserInfo.profile['given_name'];
    const apellido= user.additionalUserInfo.profile['family_name'];

    const mensaje = "Bienvenido" + nombre + ", " + apellido;

    alert(mensaje);
    this.route.navigate(['publico/principal']);
  }
}

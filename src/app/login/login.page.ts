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
          this.route.navigate(['principalAgentes']);
        }else if(this.usuario2.correo==correo && this.usuario2.clave==clave && this.usuario2.rol=='cliente'){
          this.route.navigate(['principalConductores']);
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

    const mensaje = "Bienvenido: " + nombre + ", " + apellido;

    alert(mensaje);
    this.usuario2.uid = user.additionalUserInfo.profile['id'];
    this.usuario2.nombre = user.additionalUserInfo.profile['given_name'];
    this.usuario2.apellido =  user.additionalUserInfo.profile['family_name'];
    this.usuario2.correo = user.additionalUserInfo.profile['email'];
    this.usuario2.clave = user.additionalUserInfo.profile['id'];
    this.usuario2.rol = "cliente";
    this.usuarioService.save(this.usuario2);
    this.route.navigate(['principalConductores']);
  }
}

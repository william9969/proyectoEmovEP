import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Usuario } from '../domain/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(public afs: AngularFirestore) { }

  save(usuario: Usuario){
    const refUsuarios = this.afs.collection("usuario");

    if(usuario.uid == null){
      usuario.uid = this.afs.createId();
    }

    refUsuarios.doc(usuario.uid).set(Object.assign({}, usuario));
  }

  getUsuarios(): Observable<any[]>{
    return this.afs.collection("usuarios"
    ).valueChanges();
  }

  findUser(correo: string, clave: string): Observable<any>{
    console.log('Correo: ' + correo);
    return this.afs.collection('usuario',
      ref => ref.where('correo', '==', correo).where('clave','==',clave)).valueChanges();
  }
  
}

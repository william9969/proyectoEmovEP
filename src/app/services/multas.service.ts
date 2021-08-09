import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Multa } from '../domain/multa';
import { Usuario } from '../domain/usuario';

@Injectable({
  providedIn: 'root'
})
export class MultasService {

  constructor(public afs: AngularFirestore) { }

  save(multa: Multa, usuario: Usuario){
    const refMultas = this.afs.collection("multa");

    if(multa.uid == null){
      multa.uid = this.afs.createId();
    }

    refMultas.doc(multa.uid).set(Object.assign({}, multa, usuario));
  }

  getMultas(): Observable<any[]>{
    return this.afs.collection("multa", 
    ).valueChanges();
  }

  findUser(cedula: string): Observable<any>{
    return this.afs.collection('multa',
      ref => ref.where('cedula', '==', cedula)).valueChanges();
  }
  
}

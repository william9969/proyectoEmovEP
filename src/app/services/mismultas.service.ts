
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Multa } from '../domain/multa';
import { Usuario } from '../domain/usuario';

@Injectable({
  providedIn: 'root'
})
export class MismultasService {

  constructor(public afs: AngularFirestore) { }

  findMultas(cedula: string): Observable<any[]>{
    //console.log('Correo: ' + correo);ref => ref.where('cedula', '==', cedula)
    return this.afs.collection("multa",
    ref => ref.where('cedula', '==', cedula)).valueChanges();
  }

  
  getMisMultas(): Observable<any[]>{
    
    
    return this.afs.collection("multa",
    ).valueChanges();
    
  }
}



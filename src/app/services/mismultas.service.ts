
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

  getMisMultas(): Observable<any[]>{
    
    return this.afs.collection("multa", 
    ).valueChanges();
    
  }
}



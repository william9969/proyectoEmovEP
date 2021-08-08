import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MultasService } from 'src/app/services/multas.service';

@Component({
  selector: 'app-mismultas',
  templateUrl: './mismultas.page.html',
  styleUrls: ['./mismultas.page.scss'],
})
export class MismultasPage implements OnInit {

  constructor(private router: Router,
    private mismultasServices: MultasService) { }
  
    mismultas:any;

  ngOnInit() {
    this.mismultas = this.mismultasServices.getMultas();
  }
  public menuConductores = [
    { icon: 'home-outline', nombre: 'Inicio',path:'publico/principalConductores'},
    { icon: 'clipboard-outline', nombre: 'Multas e Infracciones',path:'publico/mismultas'},
    { icon: 'business-outline', nombre: 'Agencias EmovEP',path:'publico/agencias'},
    { icon: 'car-outline', nombre: 'Matriculacion Vehicular',path:''},
    { icon: 'earth-outline', nombre: 'Revicion Tecnica Vehicular',path:''},
    { icon: 'people-outline', nombre: 'Acerca de',path:'publico/acerca-de'},
    { icon: 'mail-outline', nombre: 'Contactenos',path:'publico/contactenos'},
  ];
  navegar(nombre: any){
    //console.log(nombre)
    this.router.navigate([nombre])
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contactenos',
  templateUrl: './contactenos.page.html',
  styleUrls: ['./contactenos.page.scss'],
})
export class ContactenosPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
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

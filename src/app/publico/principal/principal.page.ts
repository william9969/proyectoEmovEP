import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  public menuConductores = [
    { icon: 'home-outline', nombre: 'Inicio'},
    { icon: 'clipboard-outline', nombre: 'Multas e Infracciones'},
    { icon: 'business-outline', nombre: 'Agencias EmovEP'},
    { icon: 'car-outline', nombre: 'Matriculacion Vehicular'},
    { icon: 'earth-outline', nombre: 'Revicion Tecnica Vehicular'},
    { icon: 'people-outline', nombre: 'Acerca de'},
    { icon: 'mail-outline', nombre: 'Contactenos'},
  ];

}

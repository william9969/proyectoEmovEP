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
  public menuAgente = [
    { icon: 'home-outline', nombre: 'Inicio'},
    { icon: 'clipboard-outline', nombre: 'Crear Multas'},
    { icon: 'business-outline', nombre: 'Agencias EmovEP'},
    { icon: 'people-outline', nombre: 'Acerca de'},
    { icon: 'mail-outline', nombre: 'Contactenos'},
  ];

}

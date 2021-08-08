import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { MismultasService } from 'src/app/services/mismultas.service';

@Component({
  selector: 'app-mismultas',
  templateUrl: './mismultas.page.html',
  styleUrls: ['./mismultas.page.scss'],
})
export class MismultasPage implements OnInit {

  mismultas:any;
  constructor(private router: Router,
    private mismultasServices: MismultasService) { }
  public menuConductores = [
    { icon: 'home-outline', nombre: 'Inicio',path:'publico/principalConductores'},
    { icon: 'clipboard-outline', nombre: 'Multas e Infracciones',path:'publico/mismultas'},
    { icon: 'business-outline', nombre: 'Agencias EmovEP',path:'publico/agencias'},
    { icon: 'car-outline', nombre: 'Matriculacion Vehicular',path:''},
    { icon: 'earth-outline', nombre: 'Revicion Tecnica Vehicular',path:''},
    { icon: 'people-outline', nombre: 'Acerca de',path:'publico/acerca-de'},
    { icon: 'mail-outline', nombre: 'Contactenos',path:'publico/contactenos'},
  ];
  ngOnInit() {
    this.mismultas = this.mismultasServices.getMisMultas();
    
  }

  mostrar(mismultas:any){
    //Crear variables
    let params: NavigationExtras = {
      queryParams:{
        mismultas:mismultas
      }
    }
    this.router.navigate([''])
  }
  
  navegar(nombre: any){
    console.log(nombre)
    this.router.navigate([nombre])
  }
}

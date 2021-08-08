import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Usuario } from 'src/app/domain/usuario';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.page.html',
  styleUrls: ['./acerca-de.page.scss'],
})
export class AcercaDePage implements OnInit {
  usrLoggAcerca: Usuario=new Usuario();
  constructor(private route:ActivatedRoute,private router: Router) {
    route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.queryParams){
        this.usrLoggAcerca=this.router.getCurrentNavigation().extras.queryParams.usr;     
      }
  })
   }

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
    let params: NavigationExtras ={
      queryParams: {
        usr: this.usrLoggAcerca
      }
    }
    this.router.navigate([nombre],params)
  }
}

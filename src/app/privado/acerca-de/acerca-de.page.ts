import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Usuario } from 'src/app/domain/usuario';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.page.html',
  styleUrls: ['./acerca-de.page.scss'],
})
export class AcercaDePage implements OnInit {
  usrAcerca: Usuario=new Usuario();
  constructor(private router: Router, route: ActivatedRoute) { 
    route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.queryParams){
        this.usrAcerca=this.router.getCurrentNavigation().extras.queryParams.usr;
      } 
    })
  }

  ngOnInit() {
  }
  public menuAgente = [
    { icon: 'home-outline', nombre: 'Inicio',path:'privado/principalAgentes'},
    { icon: 'clipboard-outline', nombre: 'Crear Multas',path:'privado/multas'},
    { icon: 'business-outline', nombre: 'Agencias EmovEP',path:'privado/agencias'},
    { icon: 'people-outline', nombre: 'Acerca de',path:'privado/acerca-de'},
    { icon: 'mail-outline', nombre: 'Contactenos',path:'privado/contactenos'},
  ];

  navegar(nombre: any){
    //console.log(nombre)
    let params: NavigationExtras ={
      queryParams: {
        usr: this.usrAcerca
      }
    }
    this.router.navigate([nombre],params)
}

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Usuario } from 'src/app/domain/usuario';
import { MultasService } from 'src/app/services/multas.service';

@Component({
  selector: 'app-multas',
  templateUrl: './multas.page.html',
  styleUrls: ['./multas.page.scss'],
})
export class MultasPage implements OnInit {
  multas:any;
  usrMultas:Usuario=new Usuario();
  constructor(private router: Router,
    private multasService : MultasService,route:ActivatedRoute) { 
      route.queryParams.subscribe(params => {
        if (this.router.getCurrentNavigation().extras.queryParams){
          this.usrMultas=this.router.getCurrentNavigation().extras.queryParams.usr;
        } 
      })
    }

  ngOnInit() {
    this.multas = this.multasService.getMultas();
  }
  public menuAgente = [
    { icon: 'home-outline', nombre: 'Inicio',path:'privado/principalAgentes'},
    { icon: 'clipboard-outline', nombre: 'Crear Multas',path:'privado/registrar-multa'},
    { icon: 'list-circle', nombre: 'Multas',path:'privado/multas'},
    { icon: 'business-outline', nombre: 'Agencias EmovEP',path:'privado/agencias'},
    { icon: 'people-outline', nombre: 'Acerca de',path:'privado/acerca-de'},
    { icon: 'mail-outline', nombre: 'Contactenos',path:'privado/contactenos'},
  ];
  navegar(nombre: any){
    //  console.log(nombre)
    let params: NavigationExtras ={
      queryParams: {
        usr: this.usrMultas
      }
    }
      this.router.navigate([nombre])
  }
}

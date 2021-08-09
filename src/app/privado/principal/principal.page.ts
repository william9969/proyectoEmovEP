import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute,NavigationExtras} from '@angular/router';
import { Usuario } from '../../domain/usuario';
import * as firebase from 'firebase';
@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {
  usrLogg: Usuario = new Usuario();
  constructor(private route: ActivatedRoute,private router: Router) { 
    route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.queryParams){
        this.usrLogg=this.router.getCurrentNavigation().extras.queryParams.usuario2;
        
      } 
    })
  }
  ngOnInit() {
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
    let params: NavigationExtras ={
      queryParams: {
        usr: this.usrLogg
      }
    }
      this.router.navigate([nombre],params)
  }
}

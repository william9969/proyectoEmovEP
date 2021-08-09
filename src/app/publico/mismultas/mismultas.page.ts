import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Params, Router } from '@angular/router';
import { Usuario } from 'src/app/domain/usuario';
import { MismultasService } from 'src/app/services/mismultas.service';

@Component({
  selector: 'app-mismultas',
  templateUrl: './mismultas.page.html',
  styleUrls: ['./mismultas.page.scss'],
})
export class MismultasPage implements OnInit {

  mismultas:any;
  usrLoggMultas: Usuario= new Usuario();
  //cedula : string;

  constructor(private router: Router,
    private mismultasServices: MismultasService, 
    private route: ActivatedRoute) { 
      route.queryParams.subscribe(params => {
        if (this.router.getCurrentNavigation().extras.queryParams){
          this.usrLoggMultas=this.router.getCurrentNavigation().extras.queryParams.usr;   
          //this.mismultas = this.mismultasServices.findMultas(this.usrLoggMultas.cedula);
          this.recuperarCedula(this.usrLoggMultas.cedula);
          console.log(this.usrLoggMultas.cedula);
        }
    }
    )
    }
    public menuConductores = [
      { icon: 'home-outline', nombre: 'Inicio',path:'publico/principalConductores'},
      { icon: 'clipboard-outline', nombre: 'Multas e Infracciones',path:'publico/mismultas'},
      { icon: 'business-outline', nombre: 'Agencias EmovEP',path:'publico/agencias'},
      { icon: 'car-outline', nombre: 'Matriculacion Vehicular',path:'publico/principalConductores'},
      { icon: 'earth-outline', nombre: 'Revicion Tecnica Vehicular',path:'publico/principalConductores'},
      { icon: 'document', nombre: 'Comprobante de pago',path:'publico/comprobante'},
      { icon: 'people-outline', nombre: 'Acerca de',path:'publico/acerca-de'},
      { icon: 'mail-outline', nombre: 'Contactenos',path:'publico/contactenos'},
    ];
  ngOnInit() {
     this.route.params.subscribe(
      (params : Params) => {this.usrLoggMultas = params.usr
        console.log(this.usrLoggMultas);}
    );
    
    //console.log(this.usrLoggMultas.cedula);
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
    //console.log(nombre)
    let params: NavigationExtras ={
      queryParams: {
        usr: this.usrLoggMultas
      }
    }
    this.router.navigate([nombre],params)
  }
  recuperarCedula( cedula: any){
    this.mismultas = this.mismultasServices.findMultas(this.usrLoggMultas.cedula);
    console.log(this.mismultas)
  }
 
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MultasService } from 'src/app/services/multas.service';

@Component({
  selector: 'app-multas',
  templateUrl: './multas.page.html',
  styleUrls: ['./multas.page.scss'],
})
export class MultasPage implements OnInit {
  multas:any;
  constructor(private router: Router,
    private multasService : MultasService) { }

  ngOnInit() {
    this.multas = this.multasService.getMultas();
  }
  public menuAgente = [
    { icon: 'home-outline', nombre: 'Inicio',path:'privado/principalAgentes'},
    { icon: 'clipboard-outline', nombre: 'Crear Multas',path:'privado/multas'},
    { icon: 'business-outline', nombre: 'Agencias EmovEP',path:'privado/agencias'},
    { icon: 'people-outline', nombre: 'Acerca de',path:'privado/acerca-de'},
    { icon: 'mail-outline', nombre: 'Contactenos',path:'privado/contactenos'},
  ];
  navegar(nombre: any){
    //  console.log(nombre)
      this.router.navigate([nombre])
  }
}

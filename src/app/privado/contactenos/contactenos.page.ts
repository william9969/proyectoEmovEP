import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { Usuario } from 'src/app/domain/usuario';

@Component({
  selector: 'app-contactenos',
  templateUrl: './contactenos.page.html',
  styleUrls: ['./contactenos.page.scss'],
})
export class ContactenosPage implements OnInit {

  //parametros
  subject='';
  body='';
  usrContactenos:Usuario=new Usuario();
  constructor(private router: Router, 
    public  emailComposer: EmailComposer,route:ActivatedRoute) { 
      route.queryParams.subscribe(params => {
        if (this.router.getCurrentNavigation().extras.queryParams){
          this.usrContactenos=this.router.getCurrentNavigation().extras.queryParams.usr;
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


   

  send(){
    let email = {
      to: 'jessicaguncay45@gmail.com',
      cc: 'wsinchi69@gmail.com',
      bcc: [],
      attachments: [
        
      ],
      subject: this.subject,
      body: this.body,
      isHtml: true,
      app:"Gmail"
    }
    this.emailComposer.open(email);
   // console.log(email);
  }
  navegar(nombre: any){
    //  console.log(nombre)
    let params: NavigationExtras ={
      queryParams: {
        usr: this.usrContactenos
      }
    }
      this.router.navigate([nombre])
  }
}

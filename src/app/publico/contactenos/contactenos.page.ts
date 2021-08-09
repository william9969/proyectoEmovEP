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
   usrLoggContactenos: Usuario=new Usuario();
  constructor(private router:Router,
    public  emailComposer: EmailComposer, private route: ActivatedRoute) {
      route.queryParams.subscribe(params => {
        if (this.router.getCurrentNavigation().extras.queryParams){
          this.usrLoggContactenos=this.router.getCurrentNavigation().extras.queryParams.usr;     
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
      app: 'gmail'
      
    }
    this.emailComposer.open(email);
  // console.log(email);
  }
  navegar(nombre: any){
    //console.log(nombre)
    let params: NavigationExtras ={
      queryParams: {
        usr: this.usrLoggContactenos
      }
    }
    this.router.navigate([nombre],params)
  }
}

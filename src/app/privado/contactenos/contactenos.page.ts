import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

@Component({
  selector: 'app-contactenos',
  templateUrl: './contactenos.page.html',
  styleUrls: ['./contactenos.page.scss'],
})
export class ContactenosPage implements OnInit {

  //parametros
  subject='';
  body='';
 
  constructor(private router: Router, 
    public  emailComposer: EmailComposer) { }

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
    //  console.log(nombre)
      this.router.navigate([nombre])
  }

   

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
    console.log(email);
  }
}

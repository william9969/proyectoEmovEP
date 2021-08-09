import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,NavigationExtras } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Usuario } from '../../domain/usuario';
import { UsuariosService } from '../../services/usuarios.service';
@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {
  usrLogg: Usuario = new Usuario();
  nombreUsr : any;
  constructor(private usuarioService: UsuariosService,private alertController: AlertController,private route: ActivatedRoute,private router:Router) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.queryParams){
        this.usrLogg=this.router.getCurrentNavigation().extras.queryParams.usuario2;
        //console.log(this.usrLogg)
        if (this.usrLogg!=null){
          if (this.usrLogg.cedula=="123"){
            this.presentAlertPrompt()
          }
        }
        else {
          this.usrLogg=this.router.getCurrentNavigation().extras.queryParams.usr;
        }
        

      }
    })
    this.nombreUsr=this.usrLogg.nombre;

  }
 
  ngOnInit() {
   
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
  
  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      cssClass: 'alert-prompt',
      header: 'Por favo, ingrese actualize su cédula',
      inputs: [
        {
          name: 'ced',
          type: 'text',
          placeholder: 'Ingrese su cédula'
        }
      ],
      buttons: [
        {
          text: 'Ok',
          handler: (alertData) => {
            this.guardarUsuario(alertData.ced);
          }
        }
      ]
    });
    alert.present();
  }

  guardarUsuario(ced: any){
    this.usrLogg.cedula=ced
    this.usuarioService.save(this.usrLogg);
  }
  navegar(nombre: any){
    let params: NavigationExtras ={
      queryParams: {
        usr: this.usrLogg
      }
    }
    console.log(this.usrLogg)
    this.router.navigate([nombre],params)
    
  }

}

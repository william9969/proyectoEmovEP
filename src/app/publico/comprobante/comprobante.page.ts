import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { MultasService } from 'src/app/services/multas.service';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Multa } from 'src/app/domain/multa';
import { Usuario } from 'src/app/domain/usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Directory, Filesystem, FilesystemDirectory } from '@capacitor/filesystem';
import { Plugins } from '@capacitor/core';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-comprobante',
  templateUrl: './comprobante.page.html',
  styleUrls: ['./comprobante.page.scss'],
})
export class ComprobantePage implements OnInit {

  multa: Multa = new Multa();
  multa2: Multa = new Multa();
  multas: any;
  usr: Usuario = new Usuario();
  myForm: FormGroup;
  pdfObj = null;
  logoData = null;
  nombreUsr : any;
  direccionMulta: any;
  fechaMulta: any;
  descripcionMulta: any;
  pagoMulta: any;
  archivo: any;
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
  constructor(private route: ActivatedRoute, private router: Router,
    private fb: FormBuilder, private plt: Platform, private http: HttpClient,
    private fileOpener: FileOpener, private multaService: MultasService,
    private usuarioService: UsuariosService, public  emailComposer: EmailComposer) {

      route.queryParams.subscribe(params=>{
        console.log('Son los parametros de llegada',params);
        //this.usr=params.usrLogg;
        this.usr=params.usr;
        if(this.router.getCurrentNavigation().extras.queryParams){
          this.usr=this.router.getCurrentNavigation().extras.queryParams.usr;
          console.log('Persona a editar',this.usr);
        }
      });

    }

  ngOnInit() {
    this.multas = this.multaService.getMultas();
    
    this.multaService.findUser(this.usr.cedula).subscribe(data=>{
      this.direccionMulta = data[0].direccion
    })

    this.multaService.findUser(this.usr.cedula).subscribe(data=>{
      this.fechaMulta = data[0].fecha
    })

    this.multaService.findUser(this.usr.cedula).subscribe(data=>{
      this.descripcionMulta = data[0].descripcion
    })

    this.multaService.findUser(this.usr.cedula).subscribe(data=>{
      this.pagoMulta = data[0].pago
    })

    console.log(this.multas);
    this.myForm = this.fb.group({
      showLogo: true,
      from: 'EMOV',
      to: 'User',
      text: 'Estimado usuario: User se ha generado este documento de pago favor de acercarse a la agencia m??s cercana para realizar el pago de su infracci??n de tr??nsito.'
    }),
    this.loadLocalAssetToBase64();
    
  }

  loadLocalAssetToBase64(){
    this.http.get('../../../assets/icon/logo.jpg', { responseType: 'blob'})
    .subscribe(res =>{
      const reader = new FileReader();
      reader.onloadend = () => {
        this.logoData = reader.result;
      }
      reader.readAsDataURL(res);
    })

  }

  createPdf(){
    const formValue = this.myForm.value;

    let logo = {};
    if(formValue.showLogo){
      logo = {image: this.logoData, width: 50};
    }

    const docDefinition = {
        watermaker: { text: 'EMOV', color: 'blue', opacity: 0.2, bold: true},
        content : [
          {
            columns: [
              logo,
              {
                text: new Date().toTimeString(),
                alignment: 'right'
              }
            ]
          },
          { text: 'COMPROBANTE DE PAGO', style: 'header'},
          {
            columns: [
              {
                width: '50%',
                text: 'Desde:',
                style: 'subheader'
              },
              {
                width: '50%',
                text: 'Hacia:',
                style: 'subheader'
              }
            ]
          },
          {
            columns: [
              {
                text: formValue.from,
              },
              {
                text: formValue.to,
              }
            ]
          },
          { text: formValue.text, margin: [0, 20, 0, 20] },
          {
            style: 'tableExample',
            table: {
              widths: [100, '*', 100, 100],
              body: [
                ['Direccion', 'Fecha', 'Descripcion', 'Total'],
                [this.direccionMulta, {text: this.fechaMulta, italics: true, color: 'black'}, {text: this.descripcionMulta, italics: true, color: 'black'}, {text: '$'+this.pagoMulta, italics: true, color: 'black'}]
              ]
            }
          },
          {
            text: '\n'
          },
          {
            text: 'Si la solicitud de pago no se cancela en las pr??ximas 48 horas, se anular?? autom??ticamente en el sistema. \n \n',
            style: 'small'
          },
          { 
            text: 'Los intereses indicados en este documento han sido generados a la fecha de su impresi??n, y estos cambian por cada d??a vencido, ev??tese inconvenientes al momento de ir al Banco.',
            style: 'small'
          },
            
        ],
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            margin: [0, 15, 0, 0],            
          },
          subheader:{
            fontSize: 14,
            bold: true,
            margin: [0, 15, 0, 0]
          },
          small: {
            italics: true,
            fontSize: 8
          }
        }
    }
    this.pdfObj = pdfMake.createPdf(docDefinition);

  }

  
  downloadPdf(){

    /*const { Filesystem } = Plugins;
    
    if (this.plt.is('cordova')) {
      // Save the PDF to the device
      const fileName = 'timesheet.pdf';
      try {
        Filesystem.writeFile({
          path: fileName,
          data: this.pdfObj,
          directory: FilesystemDirectory.Documents
          // encoding: FilesystemEncoding.UTF8
        }).then((writeFileResult) => {
          Filesystem.getUri({
              directory: FilesystemDirectory.Documents,
              path: fileName
          }).then((getUriResult) => {
              const path = getUriResult.uri;
              this.fileOpener.open(path, 'application/pdf')
              .then(() => console.log('File is opened'))
              .catch(error => console.log('Error openening file', error));
          }, (error) => {
              console.log(error);
          });
        });
      } catch (error) {
        console.error('Unable to write file', error);
      }*/
    //} else {
    // On a browser simply use download
    this.pdfObj.download();
    //}
  }

  sendPdf(){

    //if(this.plt.is('cordova')) {
     
      this.emailComposer.isAvailable().then((available: boolean) =>{
        if(available) {
          let email = {
            to: "pedrorellana1998@gmail.com",
            cc: this.usr.correo,
            bcc: [],
            attachments: [
              this.pdfObj,
            ],
            subject: 'Comprobante de pago EMOV',
            body: '',
            isHtml: true
          };
          this.emailComposer.open(email);
          console.log(email);
        }
       });
      
    /*} else {
          let email = {
            to: "pedrorellana1998@gmail.com",
            cc: this.usr.correo,
            bcc: [],
            attachments: [
              this.pdfObj,
            ],
            subject: 'Comprobante de pago EMOV',
            body: '',
            isHtml: true
          };
          this.emailComposer.open(email);
          console.log(email);
        }*/
  }
  navegar(nombre: any){
    let params: NavigationExtras ={
      queryParams: {
        usr: this.usr
      }
    }
    //console.log(this.usrLogg)
    this.router.navigate([nombre],params)
    
  }

}

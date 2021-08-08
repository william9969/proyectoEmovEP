import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { MultasService } from 'src/app/services/multas.service';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { ActivatedRoute, Router } from '@angular/router';
import { Multa } from 'src/app/domain/multa';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-comprobante',
  templateUrl: './comprobante.page.html',
  styleUrls: ['./comprobante.page.scss'],
})
export class ComprobantePage implements OnInit {

  multas: Multa = new Multa();
  myForm: FormGroup;
  pdfObj = null;
  logoData = null;

  constructor(private route: ActivatedRoute, private router: Router,
    private fb: FormBuilder, private plt: Platform, private http: HttpClient,
    private fileOpener: FileOpener, private multaService: MultasService,public  emailComposer: EmailComposer) { 

      route.queryParams.subscribe(params=>{
        console.log('Son los parametros de llegada',params);
        this.multas=params.multas;
        if(this.router.getCurrentNavigation().extras.queryParams){
          this.multas=this.router.getCurrentNavigation().extras.queryParams.multas;
          console.log('Persona a editar',this.multas);
        }
      });

      console.log(this.multas);
    }

  ngOnInit() {

    this.myForm = this.fb.group({
      showLogo: true,
      from: 'EMOV',
      to: 'User',
      text: 'Estimado usuario: User se ha generado este documento de pago favor de acercarse a la agencia más cercana para realizar el pago de su infracción de tránsito.'
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
              widths: [100, '*', 200, '*'],
              body: [
                ['Direccion', 'Fecha', 'Descripcion', 'Total'],
                ['Hospital Central', {text: '08/08/2021', italics: true, color: 'black'}, {text: 'Mal parqueado', italics: true, color: 'black'}, {text: '$100.1', italics: true, color: 'black'}]
              ]
            }
          },
          {
            text: '\n'
          },
          {
            text: 'Si la solicitud de pago no se cancela en las próximas 48 horas, se anulará automáticamente en el sistema. \n \n',
            style: 'small'
          },
          { 
            text: 'Los intereses indicados en este documento han sido generados a la fecha de su impresión, y estos cambian por cada día vencido, evítese inconvenientes al momento de ir al Banco.',
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
    console.log(this.pdfObj);
  }

  downloadPdf(){
    if(this.plt.is('cordova')) {

    } else {
      let email = {
        to: 'pedrorellana1998@gmail.com',
        cc: 'pedrorellana1998@gmail.com',
        bcc: [],
        attachments: [
          this.pdfObj.download(),
        ],
        subject: 'Comprobante de pago EMOV',
        body: '',
        isHtml: true,
        app:"Gmail"
      }
      this.emailComposer.open(email);
      console.log(email);
    }
  }

}

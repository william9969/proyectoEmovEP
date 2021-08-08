import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { MultasService } from 'src/app/services/multas.service';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-comprobante',
  templateUrl: './comprobante.page.html',
  styleUrls: ['./comprobante.page.scss'],
})
export class ComprobantePage implements OnInit {

  multas: any;
  myForm: FormGroup;
  pdfObj = null;
  logoData = null;

  constructor(private fb: FormBuilder, private plt: Platform, private http: HttpClient,
    private fileOpener: FileOpener, private multaService: MultasService) { }

  ngOnInit() {
    this.multas = this.multaService.getMultas();
    this.myForm = this.fb.group({
      showLogo: true,
      from: 'EMOV',
      to: 'User',
      text: 'test'
    })
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

  async takePhoto(){
    let image = this.multaService.getMultas();
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
          { text: 'REMINDER', style: 'header'},
          {
            columns: [
              {
                width: '50%',
                text: 'From',
                style: 'subheader'
              },
              {
                width: '50%',
                text: 'To',
                style: 'subheader'
              }
            ]
          },
          {
            columns: [
              {
                width: '50%',
                text: formValue.from,
              },
              {
                width: '50%',
                text: formValue.to,
              }
            ]
          },
          { text: formValue.text, margin: [0, 20, 0, 20] },
        ],
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            margin: [0, 15, 0, 0]
          },
          subheader:{
            fontSize: 14,
            bold: true,
            margin: [0, 15, 0, 0]
          }
        }
    }
    this.pdfObj = pdfMake.createPdf(docDefinition);
    console.log(this.pdfObj);
  }

  downloadPdf(){
    if(this.plt.is('cordova')) {

    } else {
      this.pdfObj.dowload();
    }
  }

}

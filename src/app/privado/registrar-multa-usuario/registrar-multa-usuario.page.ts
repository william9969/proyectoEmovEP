import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Multa } from 'src/app/domain/multa';
import { MultasService } from 'src/app/services/multas.service';
import {AngularFireStorage, AngularFireUploadTask} from "@angular/fire/storage";
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/domain/usuario';

export interface FILE{
  name: string;
  filepath: string;
  size: number;
}

@Component({
  selector: 'app-registrar-multa-usuario',
  templateUrl: './registrar-multa-usuario.page.html',
  styleUrls: ['./registrar-multa-usuario.page.scss'],
})
export class RegistrarMultaUsuarioPage implements OnInit {

  fileUploadedPath: Observable<string>;
  files: Observable<FILE[]>;
  FileName: string;
  FileSize: number;
  isImgUploading: boolean;
  isImgUploaded: boolean;
  electrodomestico: Multa;
  private ngFirestoreCollection: AngularFirestoreCollection<FILE>;

  descripcion: string;

  multa: Multa = new Multa();

  multas: any;

  usuario: Usuario = new Usuario();

  constructor(private route: ActivatedRoute, 
      private multaService: MultasService,
      private router: Router,
      private angularFirestore: AngularFirestore,
      private angularFireStorage: AngularFireStorage) { 

        route.queryParams.subscribe(params=>{
          console.log('Son los parametros de llegada',params);
          this.usuario=params.usuario;
          if(this.router.getCurrentNavigation().extras.queryParams){
            this.usuario=this.router.getCurrentNavigation().extras.queryParams.usuario;
            console.log('Persona a editar',this.usuario);
          }
        });
    
    console.log(this.usuario);
    
  }
    
  ngOnInit() {
    this.multas = this.multaService.getMultas();
  }

  async registrar(){
    console.log(this.multa);
    this.multaService.save(this.multa, this.usuario);
    this.router.navigate(['privado/principalAgentes']);
  }

  async fileUpload(event: FileList) {

    const file = event.item(0);

    if (file.type.split('/')[0] !== 'image') {
      console.log('File type is not supported!');
      return;
    }

    this.isImgUploading = true;
    this.isImgUploaded = false;

    this.FileName = file.name;

    const fileStoragePath = `filesStorage/${new Date().getTime()}_${file.name}`;
    const imageRef = this.angularFireStorage.ref(fileStoragePath);

    const snap = await this.angularFireStorage.upload(fileStoragePath, file);
    this.getDownloadPath(snap);

  }

  async getDownloadPath(snap){
    const url = await snap.ref.getDownloadURL();
    this.multa.imagen = url;
  }

}

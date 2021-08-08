import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NavigationExtras, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Usuario } from 'src/app/domain/usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-registrar-multa',
  templateUrl: './registrar-multa.page.html',
  styleUrls: ['./registrar-multa.page.scss'],
})
export class RegistrarMultaPage implements OnInit {

  constructor(private firestore: AngularFirestore,
    private route:Router,
    private usuarioService: UsuariosService) { }

  public usuarios: any;

 async ngOnInit() {
  }

  async filterList(evt) {  

    const searchTerm = evt.srcElement.value;
    
    if (!searchTerm) {
      return;
    }
    this.usuarios = this.usuarioService.findId(searchTerm);
  }

  registrar(usuario: any){
    let params: NavigationExtras = {
      queryParams: {
        usuario: usuario
      }
    } 
    console.log(usuario);
    this.route.navigate(['privado/registrar-multa-usuario'], params);
  }
  

}

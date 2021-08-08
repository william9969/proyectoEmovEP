import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrarMultaUsuarioPageRoutingModule } from './registrar-multa-usuario-routing.module';

import { RegistrarMultaUsuarioPage } from './registrar-multa-usuario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrarMultaUsuarioPageRoutingModule
  ],
  declarations: [RegistrarMultaUsuarioPage]
})
export class RegistrarMultaUsuarioPageModule {}

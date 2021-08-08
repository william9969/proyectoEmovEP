import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrarMultaPageRoutingModule } from './registrar-multa-routing.module';

import { RegistrarMultaPage } from './registrar-multa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrarMultaPageRoutingModule
  ],
  declarations: [RegistrarMultaPage]
})
export class RegistrarMultaPageModule {}

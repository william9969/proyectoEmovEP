import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgenciasPageRoutingModule } from './agencias-routing.module';

import { AgenciasPage } from './agencias.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgenciasPageRoutingModule
  ],
  declarations: [AgenciasPage]
})
export class AgenciasPageModule {}

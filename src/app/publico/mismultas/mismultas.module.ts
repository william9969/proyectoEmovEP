import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MismultasPageRoutingModule } from './mismultas-routing.module';

import { MismultasPage } from './mismultas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MismultasPageRoutingModule
  ],
  declarations: [MismultasPage]
})
export class MismultasPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComprobantePageRoutingModule } from './comprobante-routing.module';

import { ComprobantePage } from './comprobante.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComprobantePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ComprobantePage]
})
export class ComprobantePageModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrarMultaPage } from './registrar-multa.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrarMultaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrarMultaPageRoutingModule {}

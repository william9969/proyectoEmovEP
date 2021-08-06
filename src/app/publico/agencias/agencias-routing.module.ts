import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgenciasPage } from './agencias.page';

const routes: Routes = [
  {
    path: '',
    component: AgenciasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgenciasPageRoutingModule {}

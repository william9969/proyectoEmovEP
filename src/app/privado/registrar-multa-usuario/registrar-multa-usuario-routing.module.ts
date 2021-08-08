import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrarMultaUsuarioPage } from './registrar-multa-usuario.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrarMultaUsuarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrarMultaUsuarioPageRoutingModule {}

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'publico/principalConductores',
    loadChildren: () => import('./publico/principal/principal.module').then( m => m.PrincipalPageModule)
  },
  {
    path: 'privado/principalAgentes',
    loadChildren: () => import('./privado/principal/principal.module').then( m => m.PrincipalPageModule)
  },
  {
    path: 'publico/agencias',
    loadChildren: () => import('./publico/agencias/agencias.module').then( m => m.AgenciasPageModule)
  },
  {
    path: 'publico/acerca-de',
    loadChildren: () => import('./publico/acerca-de/acerca-de.module').then( m => m.AcercaDePageModule)
  },
  {
    path: 'publico/contactenos',
    loadChildren: () => import('./publico/contactenos/contactenos.module').then( m => m.ContactenosPageModule)
  },
  {
    path: 'privado/multas',
    loadChildren: () => import('./privado/multas/multas.module').then( m => m.MultasPageModule)
  },
  {
    path: 'privado/agencias',
    loadChildren: () => import('./privado/agencias/agencias.module').then( m => m.AgenciasPageModule)
  },
  {
    path: 'privado/acerca-de',
    loadChildren: () => import('./privado/acerca-de/acerca-de.module').then( m => m.AcercaDePageModule)
  },
  {
    path: 'privado/contactenos',
    loadChildren: () => import('./privado/contactenos/contactenos.module').then( m => m.ContactenosPageModule)
  },
  {
    path: 'publico/mismultas',
    loadChildren: () => import('./publico/mismultas/mismultas.module').then( m => m.MismultasPageModule)
  },
  {
    path: 'privado/registrar-multa',
    loadChildren: () => import('./privado/registrar-multa/registrar-multa.module').then( m => m.RegistrarMultaPageModule)
  },
  {
    path: 'registrar',
    loadChildren: () => import('./registrar/registrar.module').then( m => m.RegistrarPageModule)
  },
  {
    path: 'privado/registrar-multa-usuario',
    loadChildren: () => import('./privado/registrar-multa-usuario/registrar-multa-usuario.module').then( m => m.RegistrarMultaUsuarioPageModule)
  },
  {
    path: 'publico/comprobante',
    loadChildren: () => import('./publico/comprobante/comprobante.module').then( m => m.ComprobantePageModule)
  }


  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

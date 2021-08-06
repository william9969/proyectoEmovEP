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
    path: 'multas',
    loadChildren: () => import('./privado/multas/multas.module').then( m => m.MultasPageModule)
  },
  {
    path: 'agencias',
    loadChildren: () => import('./privado/agencias/agencias.module').then( m => m.AgenciasPageModule)
  },
  {
    path: 'acerca-de',
    loadChildren: () => import('./acerca-de/acerca-de.module').then( m => m.AcercaDePageModule)
  },
  {
    path: 'contactenos',
    loadChildren: () => import('./privado/contactenos/contactenos.module').then( m => m.ContactenosPageModule)
  }
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

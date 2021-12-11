import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'annoces',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'imagepick',
    loadChildren: () => import('./imagepick/imagepick.module').then( m => m.ImagepickPageModule)
  },
  {
    path: 'publication',
    loadChildren: () => import('./publication/publication.module').then( m => m.PublicationPageModule)
  },
  {
    path: 'annoces',
    loadChildren: () => import('./annoces/annoces.module').then( m => m.AnnocesPageModule)
  },
  {
    path: 'modalpage',
    loadChildren: () => import('./modalpage/modalpage.module').then( m => m.ModalpagePageModule)
  },
  {
    path: 'resultat',
    loadChildren: () => import('./resultat/resultat.module').then( m => m.ResultatPageModule)
  },
  {
    path: 'detail',
    loadChildren: () => import('./detail/detail.module').then( m => m.DetailPageModule)
  },
  {
    path: 'retirees',
    loadChildren: () => import('./retirees/retirees.module').then( m => m.RetireesPageModule)
  },
  {
    path: 'creater',
    loadChildren: () => import('./creater/creater.module').then( m => m.CreaterPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

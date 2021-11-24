import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnnocesPage } from './annoces.page';

const routes: Routes = [
  {
    path: '',
    component: AnnocesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnnocesPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RetireesPage } from './retirees.page';

const routes: Routes = [
  {
    path: '',
    component: RetireesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RetireesPageRoutingModule {}

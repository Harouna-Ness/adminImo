import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreaterPage } from './creater.page';

const routes: Routes = [
  {
    path: '',
    component: CreaterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreaterPageRoutingModule {}

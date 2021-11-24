import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImagepickPage } from './imagepick.page';

const routes: Routes = [
  {
    path: '',
    component: ImagepickPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImagepickPageRoutingModule {}

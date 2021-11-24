import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImagepickPageRoutingModule } from './imagepick-routing.module';

import { ImagepickPage } from './imagepick.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImagepickPageRoutingModule
  ],
  declarations: [ImagepickPage]
})
export class ImagepickPageModule {}

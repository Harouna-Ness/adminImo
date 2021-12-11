import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreaterPageRoutingModule } from './creater-routing.module';

import { CreaterPage } from './creater.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreaterPageRoutingModule
  ],
  declarations: [CreaterPage]
})
export class CreaterPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RetireesPageRoutingModule } from './retirees-routing.module';

import { RetireesPage } from './retirees.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RetireesPageRoutingModule
  ],
  declarations: [RetireesPage]
})
export class RetireesPageModule {}

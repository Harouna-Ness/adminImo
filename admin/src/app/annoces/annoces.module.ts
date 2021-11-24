import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnnocesPageRoutingModule } from './annoces-routing.module';

import { AnnocesPage } from './annoces.page';
import { ModalpagePage } from '../modalpage/modalpage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnnocesPageRoutingModule
  ],
  declarations: [AnnocesPage, ModalpagePage],
  entryComponents: [ModalpagePage]
})
export class AnnocesPageModule {}

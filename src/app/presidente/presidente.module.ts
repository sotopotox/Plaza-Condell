import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PresidentePageRoutingModule } from './presidente-routing.module';

import { PresidentePage } from './presidente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PresidentePageRoutingModule
  ],
  declarations: [PresidentePage]
})
export class PresidentePageModule {}

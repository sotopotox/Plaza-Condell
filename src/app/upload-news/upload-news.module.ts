import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UploadNewsPageRoutingModule } from './upload-news-routing.module';

import { UploadNewsPage } from './upload-news.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UploadNewsPageRoutingModule
  ],
  declarations: [UploadNewsPage]
})
export class UploadNewsPageModule {}

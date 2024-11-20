import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UploadNewsPage } from './upload-news.page';

const routes: Routes = [
  {
    path: '',
    component: UploadNewsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UploadNewsPageRoutingModule {}

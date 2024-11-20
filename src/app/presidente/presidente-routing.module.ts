import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PresidentePage } from './presidente.page';

const routes: Routes = [
  {
    path: '',
    component: PresidentePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PresidentePageRoutingModule {}

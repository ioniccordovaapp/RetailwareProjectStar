import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FccPage } from './fcc.page';

const routes: Routes = [
  {
    path: '',
    component: FccPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FccPageRoutingModule {}

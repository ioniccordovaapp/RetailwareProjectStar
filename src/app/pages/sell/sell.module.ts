import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SellPageRoutingModule } from './sell-routing.module';

import { SellPage } from './sell.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SellPageRoutingModule
  ],
  providers: [DatePipe]
  // declarations: [SellPage]
})
export class SellPageModule {}

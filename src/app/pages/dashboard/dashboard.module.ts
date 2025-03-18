import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
// import { MenuComponent } from 'src/app/components/menu/menu.component';
import { DatePipe } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule
  ],
  providers: [DatePipe], // Add this line
  // declarations: [DashboardPage,MenuComponent]
})
export class DashboardPageModule {}

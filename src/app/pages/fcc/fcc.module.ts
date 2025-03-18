import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FccPageRoutingModule } from './fcc-routing.module';

import { FccPage } from './fcc.page';
import { ReactiveFormsModule } from '@angular/forms';
import { BarcodeScannerComponent } from 'src/app/components/barcode-scanner/barcode-scanner.component';

@NgModule({
  imports: [
    BarcodeScannerComponent,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    FccPageRoutingModule
  ],
  declarations: [FccPage]
})
export class FccPageModule {}

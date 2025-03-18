import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { FolderPageRoutingModule } from './folder-routing.module';

import { FolderPage } from './folder.page';
import { BarcodeScannerComponent } from '../components/barcode-scanner/barcode-scanner.component';
import { BtPrinterPluginComponent } from '../components/bt-printer-plugin/bt-printer-plugin.component';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { CameraComponent } from '../components/camera/camera.component';
import { Camera } from '@awesome-cordova-plugins/camera/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FolderPageRoutingModule,
    BarcodeScannerComponent,
    BtPrinterPluginComponent,
    CameraComponent
  ],
  declarations: [FolderPage],
  providers: [
    BarcodeScanner, Camera],
})
export class FolderPageModule {}

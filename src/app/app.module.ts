import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms'; // ✅ Import FormsModule
import { FirebaseX } from '@awesome-cordova-plugins/firebase-x/ngx';
import { BarcodeScannerComponent } from './components/barcode-scanner/barcode-scanner.component';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';

import { Camera } from '@awesome-cordova-plugins/camera/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { HttpClientModule } from '@angular/common/http';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { ReactiveFormsModule } from '@angular/forms'; // ✅ Import this
import { Device } from '@awesome-cordova-plugins/device/ngx';

@NgModule({
  declarations: [AppComponent],
  imports: [BarcodeScannerComponent, ReactiveFormsModule, HttpClientModule, FormsModule, BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [BarcodeScanner, HTTP, FirebaseX, Camera, File, SocialSharing, Device,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule { }

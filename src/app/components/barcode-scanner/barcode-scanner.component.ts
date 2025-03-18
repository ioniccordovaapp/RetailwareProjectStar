import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-barcode-scanner',
  standalone: true, // Ensure this is a standalone component
  imports: [IonicModule, CommonModule], // Import IonicModule
  templateUrl: './barcode-scanner.component.html',
  styleUrls: ['./barcode-scanner.component.scss'],
})
export class BarcodeScannerComponent  implements OnInit {

  constructor(private barcodeScanner: BarcodeScanner) {}
  ngOnInit() {}

  scannedData: any;

  

  scanCode() {
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data:', barcodeData);
      this.scannedData = barcodeData.text; // Store scanned data
    }).catch(err => {
      console.error('Scanning failed!', err);
    });
  }
}

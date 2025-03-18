import { Component, OnInit } from '@angular/core';
import { Platform, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
// Import Android Permissions plugin
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
import { IonHeader, IonButton, IonCard, IonCardContent, IonToolbar, IonTitle, IonContent, IonCardHeader, IonCardTitle, IonItem, IonLabel } from "@ionic/angular/standalone";

declare let BTPrinter: any; // Declare the BTPrinter plugin

@Component({
  selector: 'app-bt-printer-plugin',
  standalone: true,
  imports: [IonicModule, FormsModule],
  templateUrl: './bt-printer-plugin.component.html',
  styleUrls: ['./bt-printer-plugin.component.scss'],
  providers: [AndroidPermissions] // Add AndroidPermissions as a provider
})
export class BtPrinterPluginComponent implements OnInit {

  
  printers: string[] = []; // Store available printers
  selectedPrinter: string | null = null; // Store selected printer

  constructor(
    private platform: Platform, 
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.platform.ready().then(() => {
      this.listPrinters();
    });
  }

  // 📌 List Available Bluetooth Printers
  listPrinters() {
    if (typeof BTPrinter === "undefined") {
      this.showAlert("Error", "BTPrinter plugin is not available. Run on a real device.");
      return;
    }

    BTPrinter.list(
      (printers: string[]) => {
        console.log("Available Printers:", printers);
        if (printers.length > 0) {
          this.printers = printers;
          this.selectedPrinter = printers[3]; // Auto-select the first printer
          this.showAlert("Printers Found", JSON.stringify(printers));
        } else {
          this.showAlert("No Printers Found", "Ensure your Bluetooth printer is turned on and paired.");
        }
      },
      (err: any) => {
        console.error("Error listing printers:", err);
        this.showAlert("Error", "Could not list Bluetooth printers.");
      }
    );
  }

  // 📌 Connect to Selected Printer
  connectPrinter() {
    if (!this.selectedPrinter) {
      this.showAlert("No Printer Selected", "Please select a printer first.");
      return;
    }

    BTPrinter.connect(
      this.selectedPrinter,
      () => this.showAlert("Connected", `Connected to ${this.selectedPrinter}`),
      (error: any) => this.showAlert("Connection Failed", "Could not connect to the printer.")
    );
  }

  // 📌 Print Test Message

  
  printTest() {
    let printData = "TEST \nWelcome to Bluetooth Printing!";
    BTPrinter.connect(function (data :any) {
   }, function (err :any) {
     },  this.selectedPrinter)
  BTPrinter.printText(function (data :any) {}, function (err:any) {}, printData)

  }
  

  // 📌 Show Alert Dialog
  async showAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }
}

import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private loading: HTMLIonLoadingElement | null = null;

  constructor(private loadingController: LoadingController,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  // private loading: HTMLIonLoadingElement | null = null;
  private timeoutHandle: any;

  // Show the loader
  async showLoader(message: string = 'Please wait...') {
    if (!this.loading) {
      this.loading = await this.loadingController.create({
        message,
        spinner: 'bubbles', // Spinner Types: 'lines', 'dots', 'bubbles', 'crescent'
        backdropDismiss: false, // Prevent dismissal on backdrop click
        cssClass: 'custom-loader', // Apply custom CSS class
        duration: 3000 // Optional: Auto-hide after 10 seconds
      });
      await this.loading.present();
    }
  }

  // ✅ Hide Loader
  async hideLoader() {
    if (this.loading) {
      await this.loading.dismiss();
      this.loading = null;
    }
  }




  // Show Alert
  async showAlert(
    message: string,
    header: string = 'Alert',
    buttonText: string = 'OK',
    onDismiss?: () => void
  ) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: [
        {
          text: buttonText,
          handler: () => {
            if (onDismiss) {
              onDismiss(); // Execute the callback function if provided
            }
          },
        },
      ],
    });
    await alert.present();
  }

  // Show Toast
  async showToast(message: string, color: string = 'primary', duration: number = 2000) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration,
      position: 'top', // position of toast
      color: color, // success, danger, warning, etc.
    });
    toast.present();
  }
}

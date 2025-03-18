import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
 
@Component({
  selector: 'app-logout-popup',
  imports: [IonicModule, FormsModule],
  templateUrl: './logout-popup.component.html',
  styleUrls: ['./logout-popup.component.scss'],
})
export class LogoutPopupComponent  implements OnInit {

  constructor(private modalCtrl: ModalController, private router:Router ) {
    
   }

  ngOnInit() {}

  closeModal() {
    this.modalCtrl.dismiss(); // Closes the modal
  }

  confirm() {
    
    // Clear local storage and navigate to login
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    
    // Navigate to login page
    this.router.navigateByUrl('/login').then(() => {
      window.location.reload();  // Reload the page after navigation
    }).catch((error) => {
      console.error('Navigation failed', error);  // Handle any navigation errors
    });
    // Dismiss the modal and pass data back to the parent component
    this.modalCtrl.dismiss({ confirmed: true });
  }
  
}

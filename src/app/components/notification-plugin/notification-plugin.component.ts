import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { FirebaseX } from '@awesome-cordova-plugins/firebase-x/ngx';

@Component({
  selector: 'app-notification-plugin',
  templateUrl: './notification-plugin.component.html',
  styleUrls: ['./notification-plugin.component.scss'],
})
export class NotificationPluginComponent  implements OnInit {


  constructor(private platform: Platform, private firebaseX: FirebaseX) {
    this.platform.ready().then(() => {
      this.initializeFirebase();
    });
  }
  ngOnInit() {}

  initializeFirebase() {
    this.firebaseX.getToken().then(token => {
      console.log(`Firebase Token: ${token}`);
    }).catch(error => console.error("Error getting token:", error));

    this.firebaseX.onMessageReceived().subscribe(data => {
      console.log("Foreground notification received:", data);
    });

    this.firebaseX.onTokenRefresh().subscribe(token => {
      console.log("Token refreshed:", token);
    });
  }
}


import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MenuService } from './services/menu.service';
import { ThemeService } from './services/theme.service';
import { NotificationService } from './services/notification.service';
import { ModalController } from '@ionic/angular';
import { LogoutPopupComponent } from './components/popup_modal/logout-popup/logout-popup.component';
import { Platform } from '@ionic/angular';
import { LoginPageService } from './services/login-page.service';
// import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  // public appPages = [
  //   { title: 'Inbox', url: '/folder/inbox', icon: 'mail' },
  //   { title: 'Outbox', url: '/folder/outbox', icon: 'paper-plane' },
  //   { title: 'Favorites', url: '/folder/favorites', icon: 'heart' },
  //   { title: 'Archived', url: '/folder/archived', icon: 'archive' },
  //   { title: 'Trash', url: '/folder/trash', icon: 'trash' },
  //   { title: 'Spam', url: '/folder/spam', icon: 'warning' },
  // ];
  // public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  // constructor() {}


  // FOR THEME
  isDarkMode: boolean = false;
  selectedTheme: string = 'default';
  menuItems : any = '';



  public appPages = [
    { title: 'Dashboard', url: '/dashboard', icon: 'home', name: 'Dashboard' },
    { title: 'Sale', url: '/sell', icon: 'pricetag', name: 'SimpleSale' },
    { title: 'Product', url: '/product', icon: 'cart', name: 'SimpleCreditPurchase' },
    { title: 'Image Assigned', url: '/image-assigned', icon: 'archive', name: 'AssignImage' },
    { title: 'FCC', url: '/fcc', icon: 'archive', name: 'FCC' },
    { title: 'Logout', url: '/login', icon: 'log-out' }, // Logout tab
  ];

  public filteredPages: any[] = []; // Filtered menu data
  showMenu: boolean = true; // Controls the visibility of the menu

  constructor(
    private router: Router, 
    private menuService: MenuService,
    private themeService: ThemeService, 
    private notificationservice: NotificationService,
    private modalCtrl: ModalController,
    private platform: Platform,
    private loginservice : LoginPageService
    // private splashScreen: SplashScreen
   ) {
    // Listen to route changes to toggle the menu visibility based on the current route
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showMenu = event.url !== '/login';  // Hide menu on login page
        this.showMenu = event.url !== '/otp';  // Hide menu on login page
      }
    });

    // FOR THEME
    this.isDarkMode = localStorage.getItem('theme') === 'dark';
    this.platform.ready().then(() => {
      this.initializeApp();
    })
   
  }




  initializeApp() {
    


    const verifiedNumber = localStorage.getItem('verified');
   
   
    if (verifiedNumber) {
   
      this.router.navigate(['/login']);
    
    }else
    {
      this.router.navigate(['/otp']); // Redirect to OTP page on startup
    }
     
    
  
  }

  // initializeApp() {
  //   this.platform.ready().then(() => {
  //   this.router.navigate(['/otp']); // Redirect to OTP page on startup
  //   });
  // };

  // initializeApp() {
  //   this.platform.ready().then(() => {
  //     setTimeout(() => {
  //       this.splashScreen.hide();
  //     }, 3000); // Hide splash screen after 3 seconds
  //   });
  // }


  ngOnInit() {
    this.loginservice.pullRecord();
    // Fetch user access data and filter menu on initialization
    this.menuService.getMenuData().subscribe(
      (userAccessData) => {
        console.log('User Access Data:', userAccessData);
        let data =  userAccessData
        this.menuItems = data.map(item => ({ Name: item.Name }));
        console.log('User Access Data:',  this.menuItems);
        // this.filterMenu(userAccessData);  // Filter menu based on user access data
        this.filterMenu(this.menuItems);  // Filter menu based on user access data
        
      },
      (error) => {
        console.error('Error fetching menu data:', error);
        // Handle error if needed, e.g., show a message to the user
      }
    );

    // FOT THEME FUNTION
    this.selectedTheme = this.themeService.getSavedTheme();
    this.themeService.applyTheme(this.selectedTheme);
  }


  filterMenu(userAccessData: any[]) {
    this.filteredPages = this.appPages.filter(page =>
      userAccessData?.some(access => access.Name === page.name)
    );
  
    console.log('Filtered Pages:', this.filteredPages);
  }
  // Method to filter the menu items based on the user's access data
  // filterMenu(userAccessData: any[]) {
  //   if (userAccessData && userAccessData.length > 0) {
  //     this.filteredPages = this.appPages.filter((page) =>
  //       userAccessData.some((access) => access.name === page.name)
  //     );
  //   } else {
  //     // If no user access data, show only basic accessible items or handle accordingly
  //     this.filteredPages = this.appPages.filter(page => page.name === 'Dashboard'); // For example
  //     // this.router.navigate(['/dashboard']);
  //   }
  // }

  // for remember me funtion code
  logout() {
    this.notificationservice.showAlert(
      'Sure To Logout Retailware',
      'Logout',
      'Logout',
      () => {
        // Clear local storage and navigate to login
        localStorage.removeItem('username');
        localStorage.removeItem('password');
        this.router.navigateByUrl('/login').then(() => {
          window.location.reload();
        });
      }
    );
  }

  // FOR THEME fUNCTIONS
  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.themeService.toggleThemes(this.isDarkMode);
  }

  onThemeChange(event: any) {
    const theme = event.detail.value;
    this.themeService.applyTheme(theme);
  }





  async openModal() {
    const modal = await this.modalCtrl.create({
      component: LogoutPopupComponent,  // The component to load
      cssClass: 'fullscreen-modal',  // Use this class for full-screen styles
      componentProps: {
        'customProp': 'value'  // Example to pass data to the modal
      }
    });

    // Inline CSS styles can be applied directly here
    modal.style.setProperty('--width', '250px');
    modal.style.setProperty('--height', '220px');
    // modal.style.setProperty('--max-width', '200');
    // modal.style.setProperty('--max-height', '40%');
    modal.style.setProperty('--border-radius', '10px');
    modal.style.setProperty('--z-index', '9999');

    return await modal.present();
  }
}

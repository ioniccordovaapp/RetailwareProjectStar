import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginPageService } from 'src/app/services/login-page.service';
import { NotificationService } from 'src/app/services/notification.service';
import { IonicModule, LoadingController } from '@ionic/angular';
// import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { MenuService } from 'src/app/services/menu.service';
import { FormsModule } from '@angular/forms';
import { Platform } from '@ionic/angular';
import { MainapiService } from 'src/app/services/mainapi.service';
import { Device } from '@awesome-cordova-plugins/device/ngx';
// import * as xml2js from 'xml2js';
// import { XMLParser } from 'fast-xml-parser'; // Import the parser from fast-xml-parser

@Component({
  selector: 'app-login',
  imports: [IonicModule, FormsModule],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  xmldata: any = '';
  username: string = '';
  password: string = '';
  rememberMe: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = '';
  allData: any;
  response: any;
  logData: any;
  dataFromParent: any = "parentData";
  JSONdata: any;
  forPopupData: any;
  apiupdateurl : any;
  apiUsername: any;
  apiPassword: any;
  ProjectId:any;
  baseURL:any;

  constructor(
    private router: Router,
    private http: HttpClient,
    private loginService: LoginPageService,
    private notificationService: NotificationService,
    private menuservice: MenuService,
    private platform: Platform,
    private mainapi : MainapiService,
    public device:Device
  ) { }

  ngOnInit() {
  
    const savedUsername = localStorage.getItem('username');
    const savedPassword = localStorage.getItem('password');
    if (savedUsername && savedPassword) {
      this.username = savedUsername;
      this.password = savedPassword;
      this.rememberMe = true;  // Automatically check "Remember Me"
    }

   
    this.retailwareCustemerDetail()
   
  }
  


  goToContactPage() {
    this.router.navigate(['/dashboard']);
  }

  retailwareCustemerDetail() {
    // this.notificationService.showLoader("Loading... Please wait.");
    
    this.loginService.pullRecord().subscribe(
      (response) => {
        console.log("Hiding loader after response");
        // this.notificationService.hideLoader();
        this.notificationService.showToast("Get CustomerDetail", 'success');
        console.log('SOAP Response:', response);
      },
      (error) => {
        console.error('Error:', error);
        console.log("Hiding loader after error");
        this.notificationService.hideLoader();
      }
    );
  }
  

  remeberMe() {
    // if (this.username === 'admin' && this.password === 'password') {
      // If "Remember Me" is checked, save credentials to localStorage
      if (this.rememberMe) {
        localStorage.setItem('username', this.username);
        localStorage.setItem('password', this.password);
      } else {
        localStorage.removeItem('username');
        localStorage.removeItem('password');
      }
    // }
  }



  // loginValidateUser(): void {
  //   let query =`Proc_GetSoftwareDetails`
  //   localStorage.setItem('DeviceUUID', this.device.uuid)
  //   this.mainapi.MainApiCall(query).subscribe({
  //     next: data => {
  //      console.log("for data of lcal for menue api required", data[0].Value);
  //        localStorage.setItem('SoftwareName', data[0].Value)
  //       let query =`Proc_ValidateUser 0,0,'${this.username}','${this.password}','${this.device.uuid}','',1`
  //       //this.router.navigate(['/dashboard']);
  //       this.remeberMe();    
  //       this.mainapi.MainApiCall(query).subscribe({
  //         next: data => {
  //       //    console.log("for data of lcal for menue api required", data.length);
  //          this.notificationService.hideLoader();
  //           this.ProjectId= localStorage.getItem('SoftwareName')
  //           if(this.ProjectId == 1)
  //           {
  //                 if(data.length)
  //                 {

  //                   this.loadMenu(data[0].UserID,data[0].BranchID, data[0].ClientID); 
  //                   this.router.navigate(['/dashboard']);
  //                 }
  //                 else
  //                 {
  //                   this.notificationService.showToast("Login failed. Please check your credentials.", 'danger'); // Danger message
  //                   return;
  //                 }
   
  //           }
  //           else
  //           {

  //             if(data[0].ResultCode==101)
  //             {
  //               this.notificationService.showToast(data[0].ResultMsg, 'danger'); // Danger message
  //               return;
  //             }
  //             else
  //             {

  //               this.loadMenu(data[0].UserID,data[0].BranchID, data[0].ClientID); 
  //               this.router.navigate(['/dashboard']);
  //             }

             
  //           }

  //        /*    this.loadMenu(data[0].UserID,data[0].BranchID, data[0].ClientID); 
            
  //             if (data && data.ClientID) {
  //              this.router.navigate(['/dashboard']);
            
  //             this.notificationService.showToast("Welcome, Login Successful!", 'success'); // Success message
           
  //           } else {
           
  //             this.notificationService.showToast("Login failed. Please check your credentials.", 'danger'); // Danger message
  //             return;
  //           } */
  //         },
  //         error: err => {
  //           console.error('Error fetching posts:', err);
  //           this.notificationService.hideLoader();
  //           // API call failed 
  //           // this.notificationService.showToast("Login failed. Please check your credentials.", 'danger'); // Danger message
  //         }
  //       });
  //     },
  //     error: err => {
  //       console.error('Error fetching posts:', err);
  //       this.notificationService.hideLoader();
  //       // API call failed 
  //       // this.notificationService.showToast("Login failed. Please check your credentials.", 'danger'); // Danger message
  //     }
  //   });
 

 
  // }


  loginValidateUser(): void {
    
    this.baseURL = localStorage.getItem('PublicURL') 
    if (!this.baseURL || this.baseURL === "null") { 
      this.retailwareCustemerDetail();
      alert("called " + this.baseURL);
    }
  
    // alert(this.baseURL )

    this.notificationService.showLoader(); // Show loader while API calls are in progress
  
    const querySoftware = 'Proc_GetSoftwareDetails';
    localStorage.setItem('DeviceUUID', this.device.uuid);
  
    this.mainapi.MainApiCall(querySoftware).subscribe({
      next: (softwareData) => {
        const softwareName = softwareData?.[0]?.Value || '';
        localStorage.setItem('SoftwareName', softwareName);
  
        const queryUser = `Proc_ValidateUser 0,0,'${this.username}','${this.password}','${this.device.uuid}','',1`;
        this.remeberMe();
  
        this.mainapi.MainApiCall(queryUser).subscribe({
          next: (userData) => {
            this.notificationService.hideLoader();
            this.handleLoginResponse(userData, softwareName);
          },
          error: (err) => this.handleError(err),
        });
      },
      error: (err) => this.handleError(err),
    });
  }
  
  /**
   * Handles login response and navigation logic
   */
  private handleLoginResponse(userData: any, softwareName: string): void {
    if (!userData?.length) {
      this.notificationService.showToast("Login failed. Please check your credentials.", 'danger');
      return;
    }

    localStorage.setItem('userData', JSON.stringify(userData));

 
    const { UserID, BranchID, ClientID, ResultCode, ResultMsg } = userData[0];
  
    if (softwareName === '1') {
      this.loadMenu(UserID, BranchID, ClientID);
      this.router.navigate(['/dashboard']);
    } else {
      if (ResultCode === 101) {
        this.notificationService.showToast(ResultMsg, 'danger');
      } else {
        this.loadMenu(UserID, BranchID, ClientID);
        this.router.navigate(['/dashboard']);
      }
    }
  }
  
  /**
   * Handles API call errors
   */
  private handleError(error: any): void {
    // this.retailwareCustemerDetail();
    console.error('API Error:', error);
    this.notificationService.hideLoader();
    this.notificationService.showToast("An error occurred. Please try again.", 'danger');
  }

  
  loadMenu(userId: string, branchId: string, clientId: string,) {
     let query= `Proc_GetUserRightsForMobile '${userId}','${branchId}','${clientId}'`
    this.mainapi.MainApiCall(query).subscribe({
      next: data => {
        console.log("menu data", data);
        this.menuservice.setMenuData(data);
      },
      error: err => {
        console.error('Error in subscription:', err);
      }
    }); 

/*     this.loginService.getMenuList(userId, branchId, clientId,).subscribe(
      (menuList) => {
        this.menuservice.setMenuData(menuList);
        console.log('Dynamic Menu:', menuList);
      },
      (error) => {
        console.error('Error fetching menu:', error);
      }
    ); */
  }

}

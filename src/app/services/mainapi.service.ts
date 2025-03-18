import { Injectable } from '@angular/core';
import { from, Observable, throwError } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { catchError, finalize, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { Platform } from '@ionic/angular';
import { UrlapiService } from './urlapi.service';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class MainapiService {
  apiupdateurl: any = '';
  baseURL:any
  getloginURLproxyngrock = 'api/wt/service/mobileapp.asmx/MobileApp_PullRecord'; // LIVE URL

 
   // getloginURL = `https://${this.apiupdateurl}/wt/service/mobileapp.asmx/MobileApp_PullRecord`; // LIVE URL
  private getloginURLproxy = 'auth/service/license.asmx'; // LIVE URL
  updatedUrlngrock: any;
  dynamicapiUrl: any = '';
  getloginURL: any;

    constructor(private http: HttpClient,
      private platform: Platform,
      private urlapiservice: UrlapiService,
      private loaderService: NotificationService,
      private httpCordova: HTTP) {
        // this.getHttpURL()
      }

    ngOnInit() {
      this.dynamicapiUrl = this.urlapiservice.getUrl();
   
      console.log('Dynamic URL:', this.dynamicapiUrl);
    }

    // getloginURL = `https://${this.dynamicapiUrl}/wt/service/mobileapp.asmx/MobileApp_PullRecord`;

    // getHttpURL(): any {
    //   this.apiupdateurl = localStorage.getItem('HttpURL');
    //   alert("ok" + this.apiupdateurl)
    //   const testurl = `https://${this.apiupdateurl}/wt/service/mobileapp.asmx/MobileApp_PullRecord`;
    //   alert (testurl);
    //   console.log(this.apiupdateurl); // Output: Value stored in local storage 
    // }

  MainApiCall(query: string): Observable<any> {
    
    this.baseURL = localStorage.getItem('PublicURL') 
    alert(this.baseURL )
    this.getloginURL = `https://${this.baseURL}/wt/service/mobileapp.asmx/MobileApp_PullRecord`;

    this.loaderService.showLoader(); // ✅ Show Loader
    // alert("called api" + query);
    const params = {
      LoginUserName: 'ajit',
      LoginPassword: 'ajit99',
      RecordSQL: query,
      //  RecordSQL: `Proc_ValidateUser 0,0,'${uname}','${upass}','MObileApp','',1`,
    };

    const headers = {
      'ngrok-skip-browser-warning': '1', // Skip ngrok warning
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    return from(this.httpCordova.get(this.getloginURL, params, headers)).pipe(
      tap(response => console.log('Raw API Response:', response)), // Debugging
      map(response => this.parseXmlResponse(response.data)), // Ensure response.data exists
      tap(parsedData => console.log('Parsed Data:', parsedData)), // Debugging
      finalize(() => {
        this.loaderService.hideLoader(); // ✅ Hide Loader After API Response (Success/Fail)
      }),
      catchError(error => {
        this.loaderService.hideLoader();
        console.error('Error occurred:', error);
        return throwError(() => new Error('Failed to fetch and parse API response.'));
      })
    );
  }

  private parseXmlResponse(response: string): any {
/*     const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(response, 'text/xml');
    const currentTable = xmlDoc.getElementsByTagName('currenttable')[0];

    if (!currentTable) {
      console.warn('No <currenttable> found in XML response');
      return null;
    }

    let obj: any = {};
    for (let i = 0; i < currentTable.children.length; i++) {
      const node = currentTable.children[i];
      obj[node.nodeName] = node.textContent?.trim() || '';
    }

    console.log('Final Parsed JSON:', obj);
    return obj; // Ensure it returns the parsed object */

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(response, 'text/xml');
    const tables = xmlDoc.getElementsByTagName('currenttable'); // Get all 'currenttable' elements
  
    if (!tables.length) {
      console.warn('No <currenttable> elements found in XML response');
      return [];
    }
  
    let resultArray: any[] = [];
  
    for (let i = 0; i < tables.length; i++) {
      let obj: any = {};
      let currentTable = tables[i];
  
      for (let j = 0; j < currentTable.children.length; j++) {
        const node = currentTable.children[j];
        obj[node.nodeName] = node.textContent?.trim() || '';
      }
  
      resultArray.push(obj); // Add parsed object to the array
    }
  
    console.log('Final Parsed JSON Array:', resultArray);
    return resultArray;

  }




  // for both web and mobile

  // MainApiCall(query: string): Observable<any> {
  //   alert('Called API with query: ' + query);

  //   const params = {
  //     LoginUserName: 'ajit',
  //     LoginPassword: 'ajit99',
  //     RecordSQL: query,
  //   };

  //   const headers = {
  //     'ngrok-skip-browser-warning': '1',
  //     'Content-Type': 'application/x-www-form-urlencoded',
  //   };

  //   if (this.platform.is('cordova') || this.platform.is('capacitor')) {
  //     // ✅ Mobile (Cordova) HTTP Request
  //     console.log('Using Cordova HTTP Plugin');
  //     this.httpCordova.setDataSerializer('urlencoded'); // Ensure proper encoding

  //     return from(this.httpCordova.get(this.getloginURL, params, headers)).pipe(
  //       tap(response => console.log('Raw API Response (Cordova):', response)),
  //       map(response => this.parseXmlResponse(response.data)), // Parse XML response
  //       tap(parsedData => console.log('Parsed Data:', parsedData)),
  //       catchError(error => {
  //         console.error('Error occurred (Cordova):', error);
  //         return throwError(() => new Error('Failed to fetch API response.'));
  //       })
  //     );

  //   } else {
  //     // ✅ Web (Angular HttpClient) HTTP Request
  //     console.log('Using Angular HttpClient for Web');

  //     const httpHeaders = new HttpHeaders(headers);
  //     const urlWithParams = `${this.getloginURL}?LoginUserName=ajit&LoginPassword=ajit99&RecordSQL=${encodeURIComponent(query)}`;

  //     return this.http.get<string>(this.getloginURL, {  params, headers}).pipe(
  //       tap(response => console.log('Raw API Response (Web):', response)),
  //       map(response => this.parseXmlResponse(response)), // Parse XML response
  //       tap(parsedData => console.log('Parsed Data:', parsedData)),
  //       catchError(error => {
  //         console.error('Error occurred (Web):', error);
  //         return throwError(() => new Error('Failed to fetch API response.'));
  //       })
  //     );
  //   }
  // }

  // private parseXmlResponse(response: string): any {
  //   const parser = new DOMParser();
  //   const xmlDoc = parser.parseFromString(response, 'text/xml');
  //   const currentTable = xmlDoc.getElementsByTagName('currenttable')[0];

  //   if (!currentTable) {
  //     console.warn('No <currenttable> found in XML response');
  //     return null;
  //   }

  //   let obj: any = {};
  //   for (let i = 0; i < currentTable.children.length; i++) {
  //     const node = currentTable.children[i];
  //     obj[node.nodeName] = node.textContent?.trim() || '';
  //   }

  //   console.log('Final Parsed JSON:', obj);
  //   return obj;
  // }
}

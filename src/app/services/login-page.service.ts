import { Injectable } from '@angular/core';
import { from, Observable, throwError } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { UrlapiService } from './urlapi.service';


// import * as xml2js from 'xml2js';
// import { XMLParser } from 'fast-xml-parser'; // Import the parser from fast-xml-parser
import { Platform } from '@ionic/angular';

// declare var HTTP: any;
@Injectable({
  providedIn: 'root'
})
export class LoginPageService {
  private updatedUrlngrock:string = '';

  // this.apiBaseURL = `https://${storedUrl}`;
  // this.apiLocaltestURL = `${this.apiBaseURL}/wt/service/mobileapp.asmx/MobileApp_PullRecord`;
  
  // private apiLocaltestURL = 'api/wt/service/mobileapp.asmx/MobileApp_PullRecord'; // LOCAL URL
  private getloginURLproxy = 'auth/service/license.asmx'; // LIVE URL
  // private apiLocaltestURL = 'https://d2f9-117-223-153-182.ngrok-free.app/wt/service/mobileapp.asmx/MobileApp_PullRecord'; // LOCAL URL
  private getloginURL = 'https://myretailware.azurewebsites.net/service/license.asmx'; // LIVE URL
  private apiLocaltestURL = `https://1b8a-103-44-106-42.ngrok-free.app/wt/service/mobileapp.asmx/MobileApp_PullRecord`;

  


  constructor(private http: HttpClient,
    private platform: Platform,
    private httpCordova: HTTP,
    private urlapiservice : UrlapiService
  ) { 
  }

  // LocalXmlApi(uname: string, upass: any): Observable<any> {
  //   const params = new HttpParams()
  //     .set('LoginUserName', 'ajit')
  //     .set('LoginPassword', 'ajit99')
  //     .set('RecordSQL', `Proc_ValidateUser 0,0,'${uname}','${upass}','MObileApp','',1`);

  //   // .set('RecordSQL', "Proc_ValidateUser 0,0,'wn','','MObileApp','',1");

  //   const headers = new HttpHeaders({
  //     'ngrok-skip-browser-warning': '1', // Skip ngrok warning
  //   });

  //   return this.http.get(this.apiLocaltestURL, { params, headers, responseType: 'text' }).pipe(
  //     map(response => {

  //       // Parse the XML response
  //       const parser = new DOMParser();
  //       const xmlDoc = parser.parseFromString(response, 'text/xml');
  //       // Extract specific values from the XML
  //       const resultCode = xmlDoc.getElementsByTagName('ResultCode')[0]?.textContent || '';
  //       const resultMsg = xmlDoc.getElementsByTagName('ResultMsg')[0]?.textContent || '';
  //       const userId = xmlDoc.getElementsByTagName('UserID')[0]?.textContent || '';
  //       const clientId = xmlDoc.getElementsByTagName('ClientID')[0]?.textContent || '';
  //       const userName = xmlDoc.getElementsByTagName('UserName')[0]?.textContent || '';
  //       const branchId  = xmlDoc.getElementsByTagName('BranchID')[0]?.textContent || '';

  //       // Return an object with the extracted values
  //       return {
  //         resultCode,
  //         resultMsg,
  //         userId,
  //         clientId,
  //         userName,
  //         branchId,
  //         rawResponse: response, // Include raw response if needed
  //       };
  //     }),
  //     catchError(error => {
  //       console.error('Error occurred:', error);
  //       // Handle the error and provide a user-friendly message
  //       return throwError(() => new Error('Failed to fetch and parse API response.'));
  //     })
  //   );
  // }

  // pullRecord(): Observable<any> {
  //   const soapRequest = `
  //     <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  //       <soap:Body>
  //         <PullRecord xmlns="http://www.retailware.in/">
  //           <LoginUserName>ajit</LoginUserName>
  //           <LoginPassword>ajit99</LoginPassword>
  //           <IMEINo>321456987456321</IMEINo>
  //           <RecordSQL>WebProc_ClientAPIInfo2 42783 ,10</RecordSQL>
  //         </PullRecord>
  //       </soap:Body>
  //     </soap:Envelope>`;

  //   const headers = new HttpHeaders({
  //     'Content-Type': 'text/xml',
  //   });

  //   return this.http.post<string>(this.getloginURL, soapRequest, {
  //     headers,
  //     responseType: 'text' as 'json',
  //   }).pipe(
  //     tap(response => {
  //       console.log('SOAP Response:', response); // Log SOAP response
  //     }),
  //     map(response => {
  //       const parser = new DOMParser();
  //       const xmlDoc = parser.parseFromString(response, 'text/xml');
  //       const clientID = xmlDoc.getElementsByTagName('ClientID')[0]?.textContent || '';
  //       const remoteKey = xmlDoc.getElementsByTagName('RemoteKey')[0]?.textContent || '';
  //       const updatedUrl = xmlDoc.getElementsByTagName('HttpURL')[0]?.textContent || '';

  //       return { clientID, remoteKey, updatedUrl };
  //     }),
  //     catchError(error => {
  //       console.error('Error occurred:', error);
  //       //alert("An error occurred while calling the API");
  //       return throwError(() => new Error('SOAP API call failed'));
  //     })
  //   );
  // }


  // getMenuList(userId: string,branchId: string, clientId: string,): Observable<any[]> {
  //   const params = new HttpParams()
  //     .set('LoginUserName', 'ajit')
  //     .set('LoginPassword', 'ajit99')
  //     .set('RecordSQL', `Proc_GetUserRightsForMobile '${userId}','${branchId}','${clientId}'`);
  
  //   const headers = new HttpHeaders({
  //     'ngrok-skip-browser-warning': '1', // Skip ngrok warning
  //   });
  
  //   return this.http.get(this.apiLocaltestURL, { params, headers, responseType: 'text' }).pipe(
  //     map((response) => {
  //       // Parse the XML response
  //       const parser = new DOMParser();
  //       const xmlDoc = parser.parseFromString(response, 'text/xml');
  
  //       // Extract all `currenttable` elements
  //       const currentTables = xmlDoc.getElementsByTagName('currenttable');
  //       // Convert the extracted XML data to an array of objects
  //       const menuList: any[] = Array.from(currentTables).map((table) => {
  //         const processId = table.getElementsByTagName('ProcessID')[0]?.textContent || '';
  //         const name = table.getElementsByTagName('Name')[0]?.textContent || '';
  //         return { processId, name };
  //       });
  
  //       // Return the processed menu list
  //       return menuList;
  //     }),
  //     catchError((error) => {
  //       console.error('Error occurred:', error);
  //       // Handle the error and provide a user-friendly message
  //       return throwError(() => new Error('Failed to fetch and parse API response.'));
  //     })
  //   );
  // }


  pullRecord(): Observable<any> {
   
    const ClientID = localStorage.getItem('verified');
    const soapRequest = `
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
                   xmlns:xsd="http://www.w3.org/2001/XMLSchema" 
                   xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <PullRecord xmlns="http://www.retailware.in/">
          <LoginUserName>ajit</LoginUserName>
          <LoginPassword>ajit99</LoginPassword>
          <IMEINo>321456987456321</IMEINo>
          <RecordSQL>WebProc_ClientAPIInfo2 ${ClientID} ,10</RecordSQL>
        </PullRecord>
      </soap:Body>
    </soap:Envelope>`;
  
    const headers = {
      'Content-Type': 'text/xml; charset=utf-8',
      'SOAPAction': 'http://www.retailware.in/PullRecord',
    };
  
    if (this.platform.is('cordova') || this.platform.is('capacitor')) {
      // ✅ Using Cordova HTTP Plugin (Bypasses CORS)
      console.log('Using Cordova HTTP Plugin');
      this.httpCordova.setDataSerializer('utf8');
  
      return from(
        this.httpCordova.post(this.getloginURL, soapRequest, headers)
      ).pipe(
        // tap(response => console.log('SOAP Response:', response.data)),
        tap(response => {
     //     console.log('SOAP Response:', response.data, );
          const parsedResponse = this.parseXmlResponse(response.data);
          localStorage.setItem("PublicURL", parsedResponse.HttpURL);
          alert("setapi" + parsedResponse.HttpURL )
       
          //console.log('test ok', parsedResponse.HttpURL, );
        
        }),
        map(response => this.parseXmlResponse(response.data)),
        catchError(error => {
          console.error('SOAP Error:', error);
          return throwError(() => new Error('SOAP API call failed'));
        })
      );
  
    } else {
      // ✅ Using Angular HttpClient for Web
      console.log('Using Angular HttpClient for Web');
      const httpHeaders = new HttpHeaders(headers);
  
      return this.http.post<string>(this.getloginURLproxy, soapRequest, {
        headers: httpHeaders,
        responseType: 'text' as 'json',
      }).pipe(
        tap(response => console.log('SOAP Response:', response)),
        map(response => this.parseXmlResponse(response)),
        catchError(error => {
          console.error('SOAP Error:', error);
          return throwError(() => new Error('SOAP API call failed'));
        })
      );
    }
  }
  
  private parseXmlResponse(response: string): any {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(response, 'text/xml');
  
    // Find the `currenttable` element
    const currentTable = xmlDoc.getElementsByTagName('currenttable')[0];
    if (!currentTable) {
      return null; // Return null if no `currenttable` is found
    }
    let obj: any = {};
    // Loop through child nodes of `currenttable` and extract key-value pairs
    for (let i = 0; i < currentTable.children.length; i++) {
      const node = currentTable.children[i];
      obj[node.nodeName] = node.textContent?.trim() || '';
    }
    console.log("finaljson",obj, obj.ClientID )
    // this.updatedUrlngrock=obj.HttpURL
    // localStorage.setItem('HttpURL', this.updatedUrlngrock);
    return obj;
  }

  // Helper function to parse XML response
  // private parseXmlResponse(response: string) {
  //   const parser = new DOMParser();
  //   const xmlDoc = parser.parseFromString(response, 'text/xml');
  //   const clientID = xmlDoc.getElementsByTagName('ClientID')[0]?.textContent || '';
  //   const remoteKey = xmlDoc.getElementsByTagName('RemoteKey')[0]?.textContent || '';
  //   const updatedUrl = xmlDoc.getElementsByTagName('HttpURL')[0]?.textContent || '';
  
  //   return { clientID, remoteKey, updatedUrl };
  // }
  
  

  LocalXmlApi(uname: string, upass: any): Observable<any> {
   
    const url = this.apiLocaltestURL;
    const params = {
      LoginUserName: 'ajit',
      LoginPassword: 'ajit99',
      RecordSQL: `Proc_ValidateUser 0,0,'${uname}','${upass}','MObileApp','',1`,
    };

    const headers = {
      'ngrok-skip-browser-warning': '1', // Skip ngrok warning
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    return from(this.httpCordova.get(url, params, headers)).pipe(
      map(response => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(response.data, 'text/xml');

        // Extract specific values from the XML
        const resultCode = xmlDoc.getElementsByTagName('ResultCode')[0]?.textContent || '';
        const resultMsg = xmlDoc.getElementsByTagName('ResultMsg')[0]?.textContent || '';
        const userId = xmlDoc.getElementsByTagName('UserID')[0]?.textContent || '';
        const clientId = xmlDoc.getElementsByTagName('ClientID')[0]?.textContent || '';
        const userName = xmlDoc.getElementsByTagName('UserName')[0]?.textContent || '';
        const branchId = xmlDoc.getElementsByTagName('BranchID')[0]?.textContent || '';

        return {
          resultCode,
          resultMsg,
          userId,
          clientId,
          userName,
          branchId,
          rawResponse: response.data, // Include raw response if needed
        };
      }),
      catchError(error => {
        console.error('Error occurred:', error);
        return throwError(() => new Error('Failed to fetch and parse API response.'));
      })
    );
  }

  getMenuList(userId: string, branchId: string, clientId: string): Observable<any[]> {
    const url = this.apiLocaltestURL;
    
    // Set parameters as an object (Cordova HTTP uses plain objects instead of HttpParams)
    const params = {
      LoginUserName: 'ajit',
      LoginPassword: 'ajit99',
      RecordSQL: `Proc_GetUserRightsForMobile '${userId}','${branchId}','${clientId}'`,
    };

    const headers = {
      'ngrok-skip-browser-warning': '1', // Skip ngrok warning
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    return from(this.httpCordova.get(url, params, headers)).pipe(
      map((response) => {
        // Parse the XML response
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(response.data, 'text/xml');

        // Extract all `currenttable` elements
        const currentTables = xmlDoc.getElementsByTagName('currenttable');

        // Convert the extracted XML data to an array of objects
        const menuList: any[] = Array.from(currentTables).map((table) => {
          const processId = table.getElementsByTagName('ProcessID')[0]?.textContent || '';
          const name = table.getElementsByTagName('Name')[0]?.textContent || '';
          return { processId, name };
        });

        // Return the processed menu list
        return menuList;
      }),
      catchError((error) => {
        console.error('Error occurred:', error);
        return throwError(() => new Error('Failed to fetch and parse API response.'));
      })
    );
  }

  async fetchOTP(ph: number) {
    alert(ph)
    const soapMessage = `
      <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
          <soap:Body>
              <ValidateOTP xmlns="http://www.retailware.in/">
                  <LoginUserName>ajit</LoginUserName>
                  <LoginPassword>ajit99</LoginPassword>
                  <RequestTypeID>3</RequestTypeID>
                  <SoftwareID>1</SoftwareID>
                  <ClientID>${ph}</ClientID>
                  <MachineName>sagar</MachineName>
                  <RequestRemark>auto</RequestRemark>
              </ValidateOTP>
          </soap:Body>
      </soap:Envelope>`;

    const headers = {
      'Content-Type': 'text/xml; charset=utf-8',
      'SOAPAction': '"http://www.retailware.in/ValidateOTP"'
    };

    const url = "https://myretailware.azurewebsites.net/service/license.asmx";

    try {
      this.httpCordova.setDataSerializer("utf8"); // Ensure correct encoding
      const response = await this.httpCordova.post(url, soapMessage, headers);
      console.log("SOAP Response:", response);
      return response.data;
    } catch (error) {
      console.error("SOAP Error:", error);
      throw error;
    }
  }


  parseXmlToJson(xmlData: string) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlData, "text/xml");

    // Convert XML to JSON manually (this is a basic example)
    function xmlToJson(xml: any): any {
      let obj: any = {};
      if (xml.nodeType === 1) { // element node
        if (xml.attributes.length > 0) {
          for (let i = 0; i < xml.attributes.length; i++) {
            const attribute = xml.attributes.item(i);
            obj[attribute.nodeName] = attribute.nodeValue;
          }
        }
      } else if (xml.nodeType === 3) { // text node
        obj = xml.nodeValue;
      }

      if (xml.hasChildNodes()) {
        for (let i = 0; i < xml.childNodes.length; i++) {
          const item = xml.childNodes.item(i);
          const nodeName = item.nodeName;
          if (obj[nodeName] === undefined) {
            obj[nodeName] = xmlToJson(item);
          } else {
            if (Array.isArray(obj[nodeName])) {
              obj[nodeName].push(xmlToJson(item));
            } else {
              obj[nodeName] = [obj[nodeName], xmlToJson(item)];
            }
          }
        }
      }
      return obj;
    }
    return xmlToJson(xmlDoc);
  }
}

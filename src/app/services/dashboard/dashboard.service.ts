import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { catchError, from, map, Observable, throwError, tap} from 'rxjs';
import { NotificationService } from '../notification.service';
import { environment } from 'src/environments/environment';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { Platform } from '@ionic/angular';



@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  // private getDashbordURL = environment.apiLocaltestURLProxy; // LOCAL URL
  private getDashbordURLproxy = 'api/wt/service/mobileapp.asmx/MobileApp_PullRecord' // LOCAL URL

  private getDashbordURL = 'https://4489-45-118-104-178.ngrok-free.app/wt/service/mobileapp.asmx/MobileApp_PullRecord'; // LOCAL URL


  constructor(private http: HttpClient,
    private platform: Platform,
    private httpCordova: HTTP,
    private Notificationservice: NotificationService) { }

  // dashboardData(date: string): Observable<any[]> {
  //   const params = new HttpParams()
  //     .set('LoginUserName', 'ajit')
  //     .set('LoginPassword', 'ajit99')
  //     .set('RecordSQL', `Proc_dashbordDataValue '${date}'`);

  //   const headers = new HttpHeaders({
  //     'ngrok-skip-browser-warning': '1', // Skip ngrok warning
  //   });
  //   // this.Notificationservice.showLoader();
  //   return this.http.get(this.getDashbordURL, { params, headers, responseType: 'text' }).pipe(
  //     map((response) => {
  //       // Parse the XML response
  //       const parser = new DOMParser();
  //       const xmlDoc = parser.parseFromString(response, 'text/xml');

  //       // Extract all `currenttable` elements
  //       const currentTables = xmlDoc.getElementsByTagName('currenttable');

  //       // Helper function to format numbers in Indian numbering system
  //       const formatNumber = (value: string): string => {
  //         const number = parseFloat(value) || 0;
  //         return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(number);
  //       };

  //       // Convert the extracted XML data to an array of objects
  //       const dashboadData: any[] = Array.from(currentTables).map((table) => {
  //         const netSale = formatNumber(table.getElementsByTagName('NetSale')[0]?.textContent || '00');
  //         const avgBill = formatNumber(table.getElementsByTagName('AvgBill')[0]?.textContent || '00');
  //         const noOfBills = formatNumber(table.getElementsByTagName('NoOfBills')[0]?.textContent || '00');
  //         const avgItem = formatNumber(table.getElementsByTagName('AvgItem')[0]?.textContent || '00');
  //         const totalQty = formatNumber(table.getElementsByTagName('TotalQty')[0]?.textContent || '00');
  //         const cancelledBills = formatNumber(
  //           table.getElementsByTagName('CancelledBills')[0]?.textContent || '00'
  //         );
  //         this.Notificationservice.hideLoader();

  //         return { netSale, avgBill, noOfBills, avgItem, totalQty, cancelledBills };
  //       });

  //       return dashboadData;
  //     }),
  //     catchError((error) => {
  //       console.error('Error occurred:', error);
  //       // Provide a user-friendly error message
  //       return throwError(() => new Error('Failed to fetch and parse API response.'));
  //     })
  //   );
  // }
  // 
  // 
  // 
 
  dashboardData(date: any): Observable<any[]> {
    const url = this.getDashbordURL;
    const params = {
      LoginUserName: 'ajit',
      LoginPassword: 'ajit99',
      RecordSQL: `Proc_dashbordDataValue '${date}'`
    };
    const headers = { 'ngrok-skip-browser-warning': '1' };
    return from(this.httpCordova.get(url, params, headers)).pipe(
      map(response => {
             
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(response.data, 'text/xml');
    console.log("finaljson",xmlDoc )
    // Find the `currenttable` element
    const currentTable = xmlDoc.getElementsByTagName('currenttable')[0];
    console.log("finaljson123",currentTable )
    if (!currentTable) {
      return null; // Return null if no `currenttable` is found
    }
  
    let obj: any = {};
    // Loop through child nodes of `currenttable` and extract key-value pairs
    for (let i = 0; i < currentTable.children.length; i++) {
      const node = currentTable.children[i];
      obj[node.nodeName] = node.textContent?.trim() || '';
    }
    console.log("ClientID:", obj);
    return obj;
      }),
      catchError(error => {
        console.error('Error occurred:', error);
        return throwError(() => new Error('Failed to fetch and parse API response.'));
      })
    );
  }


  dashboarSelldData(): Observable<any> {
    const url = this.getDashbordURL;
    const params = {
      LoginUserName: 'ajit',
      LoginPassword: 'ajit99',
      RecordSQL: `Mobile_Proc_SaleRegister_Branchwise 1,1`
    };
    const headers = { 'ngrok-skip-browser-warning': '1' };
  
    return from(this.httpCordova.get(url, params, headers)).pipe(
      map((response) => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(response.data, 'text/xml'); // Use `response.data` in Cordova HTTP plugin
        const currentTables = xmlDoc.getElementsByTagName('currenttable');
  
        // Helper function to format numbers in Indian numbering system
        const formatNumber = (value: string): string => {
          const number = parseFloat(value) || 0;
          return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format(number);
        };
  
        // Convert the extracted XML data to an array of objects
        const table1: any[] = Array.from(currentTables).map((table) => {
          const rowNo = parseInt(table.getElementsByTagName('RowNo')[0]?.textContent || '0', 10);
          const branch = table.getElementsByTagName('Branch')[0]?.textContent || 'NA';
          const voucherNo = table.getElementsByTagName('VoucherNo')[0]?.textContent || '0';
          const date = table.getElementsByTagName('Date')[0]?.textContent || 'NA';
          const totalItems = formatNumber(table.getElementsByTagName('TotalItems')[0]?.textContent || '0');
          const netAmount = formatNumber(table.getElementsByTagName('NetAmount')[0]?.textContent || '0');
          return { RowNo: rowNo, Branch: branch, VoucherNo: voucherNo, Date: date, TotalItems: totalItems, NetAmount: netAmount };
        });
  
        console.log('Parsed Dashboard Sell Data:', { Table1: table1 });
        return { Table1: table1 }; // Ensure the response is in expected format
      }),
      catchError((error) => {
        console.error('Error occurred:', error);
        return throwError(() => new Error('Failed to fetch and parse API response.'));
      })
    );
  }
  
  


  // dashboarSelldData(): Observable<any> {
  //   const params = new HttpParams()
  //     .set('LoginUserName', 'ajit')
  //     .set('LoginPassword', 'ajit99')
  //     .set('RecordSQL', `Mobile_Proc_SaleRegister_Branchwise 1,1`);

  //   const headers = new HttpHeaders({
  //     'ngrok-skip-browser-warning': '1', // Skip ngrok warning
  //   });

  //   return this.http.get(this.getDashbordURL, { params, headers, responseType: 'text' }).pipe(
  //     map((response) => {
  //       const parser = new DOMParser();
  //       const xmlDoc = parser.parseFromString(response, 'text/xml');
  //       const currentTables = xmlDoc.getElementsByTagName('currenttable');

  //       // Helper function to format numbers in Indian numbering system
  //       const formatNumber = (value: string): string => {
  //         const number = parseFloat(value) || 0;
  //         return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format(number);
  //       };

  //       // Convert the extracted XML data to an array of objects
  //       const table1: any[] = Array.from(currentTables).map((table) => {
  //         const rowNo = parseInt(table.getElementsByTagName('RowNo')[0]?.textContent || '0', 10);
  //         const branch = table.getElementsByTagName('Branch')[0]?.textContent || 'NA';
  //         const voucherNo = table.getElementsByTagName('VoucherNo')[0]?.textContent || '0';
  //         const date = table.getElementsByTagName('Date')[0]?.textContent || 'NA';
  //         const totalItems = formatNumber(table.getElementsByTagName('TotalItems')[0]?.textContent || '0');
  //         const netAmount = formatNumber(table.getElementsByTagName('NetAmount')[0]?.textContent || '0');
  //         return { RowNo: rowNo, Branch: branch, VoucherNo: voucherNo, Date: date, TotalItems: totalItems, NetAmount: netAmount };
  //       });

  //       // Return the JSON structure with "Table1"
  //       return { Table1: table1 };
  //     }),
  //     catchError((error) => {
  //       console.error('Error occurred:', error);
  //       // Provide a user-friendly error message
  //       return throwError(() => new Error('Failed to fetch and parse API response.'));
  //     })
  //   );
  // }


}

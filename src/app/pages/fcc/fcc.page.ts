import { Component, OnInit } from '@angular/core';
import { MainapiService } from 'src/app/services/mainapi.service';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { NotificationService } from 'src/app/services/notification.service';
import { Device } from '@awesome-cordova-plugins/device/ngx';


@Component({
  selector: 'app-fcc',
  templateUrl: './fcc.page.html',
  styleUrls: ['./fcc.page.scss'],
  standalone: false
})
export class FccPage implements OnInit {

  batchNo: any = '';  // Variable for Batch No. input
  salesManId: string = ''; // Variable for Sales Man ID dropdown
  labelCount: any = 1; // Variable for Label Count input
  quantity: any = '';
  // List of Sales Man IDs for dropdown
  salesManList: string[] = ['001', '002', '003', '004', '056', '100'];
  getSalesmanData: any;
  selectedSalesmanID: any;
  getProductData: any;
  deviceNumber: any;
  getPrinterList: any;
  selectedPrinter: any = "undefiend";

  scannedData: any;
  selectedProduct: string = '';
  printer: boolean = false;
  userdata: any;
  projectId: any;
  getsplitsymbol: any;

  constructor(
    public device: Device,
    private loaderService: NotificationService,
    private mainapi: MainapiService,
    private barcodeScanner: BarcodeScanner
  ) { }

  ngOnInit() {
    this.showPrinterList(); //called printer list api
    this.getLocalStortageData(); // get local storage data
    this.calledsplitapi()// called api for split product code 

    this.deviceNumber = this.device.uuid, //get device number
      //  console.log("this device number is " , this.deviceNumber)
      this.fccGetSalesman(); // call fcc salesman data
  }

  calledsplitapi (){
    this.projectId = localStorage.getItem ('SoftwareName')
    let query = "";
    if (this.projectId == 1) {
			// upplus
			query = "SELECT PRODUCTSEPARATOR AS PRODUCTBATCHSEPARATOR FROM OPTIONS";
		} else {
			// Rpro
			query = "SELECT VALUE AS PRODUCTBATCHSEPARATOR FROM RPLUS_GLOBALSETTINGS WHERE NAME = 'ProductBatchSeparator'";
		}
    this.mainapi.MainApiCall(query).subscribe({
      next: data => {
        this.getsplitsymbol = data
        console.log("calledsplitapi",this.getsplitsymbol)
      },
      error: err => {
        console.error('Error fetching posts:', err);
      }
    })
  }

  getLocalStortageData() {
    const savedPrinter = localStorage.getItem('selectedPrinter'); // store local printer
    if (savedPrinter) {
      this.selectedPrinter = savedPrinter;
    }

    const savedSealsmanid = localStorage.getItem('selectedSalesmanID'); // store local printer
    if (savedSealsmanid) {
      this.selectedSalesmanID = savedSealsmanid;
    }
  }

  productList = [
    { code: '12345', name: 'Product A' },
    { code: '67890', name: 'Product B' },
    { code: '11223', name: 'Product C' }
  ];

  // Method to handle form submission (optional)
  submitForm() {
    console.log('Batch No:', this.batchNo);
    console.log('Sales Man ID:', this.salesManId);
    console.log('Label Count:', this.labelCount);
  }

  fccGetSalesman() {
    let query = `exec Proc_GetSalesmanFCC 3,'063cb2da36ecd343',1`
    this.mainapi.MainApiCall(query).subscribe({
      next: data => {
        this.getSalesmanData = data; // Assign the "Table1" array to the property
        console.log("fccGetSalesman:", this.getSalesmanData);
        // this.notificationservice.hideLoader(); //
      },
      error: err => {
        console.error('Error fetching posts:', err);
      }
    });
  }


  onSalesmanSelect(event: any) {

    const selectedSalesman = event.detail.value;
    if (selectedSalesman) {

      this.selectedSalesmanID = selectedSalesman // Show ID in input box

    }
  }

  // scanBarcode() {
  //   console.log("Barcode icon clicked!");
  //   // Add barcode scanning functionality here
  // }

  scanBarcode() {
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data:', barcodeData);

      let str = barcodeData.text;
      let parts = str.split("#");
      this.scannedData = parts[0]; // "56546"
      this.batchNo  = parts[1]; // "dfd2"
      console.log("First Part:", this.scannedData);
      console.log("Second Part:", this.batchNo );

      // this.scannedData = barcodeData.text; // Store scanned data
    }).catch(err => {
      console.error('Scanning failed!', err);
    });
  }

  onSubmit(form: any) {
    if (form.valid) {
      console.log('Form Data:', form.value);
      alert('Form submitted successfully!');
      // form.reset();
    }
  }

  onBlur(event: FocusEvent) {
    console.log('Input field focused:', (event.target as HTMLInputElement).id);
    let query = `exec Proc_ValidateProductAndBatchNo '${this.scannedData}',1`
    this.mainapi.MainApiCall(query).subscribe({
      next: data => {
        this.getProductData = data; // Assign the "Table1" array to the property
        this.batchNo = this.getProductData[0].BatchNo;
        console.log("fccGetproductdata :", this.getProductData);
        // this.notificationservice.hideLoader(); //
        if ( this.getProductData[0].ResultCode == 101) {
          alert( this.getProductData[0].ResultMsg )
          this.quantity = '';
          this.scannedData = '';

        }
      },
      error: err => {
        console.error('Error fetching posts:', err);
      }
    });
  }

  // fccProductSave(form: any){
  //   if (form.valid) {
  //      this.loaderService.showLoader();
  //     console.log('Form SAVETIME Data:', form.value);
  //     let query = `exec Proc_AddUpdateFCCRecords '6','1',5,1,4,3,'063cb2da36ecd343',1`
  //     this.mainapi.MainApiCall(query).subscribe({
  //     next: data => {
  //       this.getProductData = data; // Assign the "Table1" array to the property
  //       alert("save"+ this.getProductData[0].ResultMsg )
  //       console.log("fccGetproductdata :", this.getProductData);
  //       // this.notificationservice.hideLoader(); //
  //       setTimeout(() => {
  //         this.loaderService.hideLoader();
  //       }, 500);
  //       this.loaderService. showToast ("saved successfully product");
  //     },
  //     error: err => {
  //       this.loaderService. hideLoader ();
  //       console.error('Error fetching posts:', err);
  //     }
  //   });
  //   }    
  // }


  fccProductSave(form: any) {
    if (form.valid) {
      this.loaderService.showLoader(); // ✅ Show Loader

      this.userdata = JSON.parse(localStorage.getItem('userData') || '{}');


      let query = "exec Proc_AddUpdateFCCRecords '" + form.value.productCode + "','" + form.value.batchNo + "'," + form.value.quantity + "," + form.value.labelCount + "," + form.value.selectedSalesmanID + "," + this.userdata[0].CounterNo + ",'" + this.deviceNumber + "'," + this.userdata[0].UserID + ""

      alert(query)

      //  let query = `exec Proc_AddUpdateFCCRecords '6','1',5,1,4,3,'063cb2da36ecd343',1`;
      localStorage.setItem('selectedSalesmanID', form.value.selectedSalesmanID);
      this.mainapi.MainApiCall(query).subscribe({
        next: (data) => {
          this.getProductData = data;
          // alert("Save: " + this.getProductData[0].ResultMsg);


          setTimeout(() => {
            this.loaderService.hideLoader(); // ✅ Hide Loader with delay
          }, 500);

          this.loaderService.showToast("Saved successfully!", 'success', 3000); // ✅ Show Success Toast
        },
        error: (err) => {
          console.error('Error:', err);
          this.loaderService.hideLoader(); // ✅ Hide Loader on Error
          this.loaderService.showToast("Save failed!", 'danger', 3000); // ❌ Show Error Toast
        }
      });
    }
  }



  // printer Functionality
  displayPrinter() {
    this.printer = !this.printer;

  }


  printerSave(form: any) {
    alert("select successfully")
    if (form.valid) {
      this.printer = false
    }
  }

  showPrinterList() {
    let query = `exec [Proc_GetPrinterMasterDetails]`
    this.mainapi.MainApiCall(query).subscribe({
      next: data => {
        this.getPrinterList = data; // Assign the "Table1" array to the property
        console.log("printerList :", this.getPrinterList);
        // this.notificationservice.hideLoader(); //
      },
      error: err => {
        console.error('Error fetching posts:', err);
      }
    });
  }

  onPrinterChange(event: Event) {
    const target = event.target as HTMLSelectElement; // ✅ Type casting to HTMLSelectElement
    if (target) {
      this.selectedPrinter = target.value;
      localStorage.setItem('selectedPrinter', this.selectedPrinter);
    }
    let query = `exec [Proc_GetPrinterMasterDetails]`
    this.mainapi.MainApiCall(query).subscribe({
      next: data => {
        this.getPrinterList = data; // Assign the "Table1" array to the property
        console.log("printerList :", this.getPrinterList);
        // this.notificationservice.hideLoader(); //
      },
      error: err => {
        console.error('Error fetching posts:', err);
      }
    });
  }
}

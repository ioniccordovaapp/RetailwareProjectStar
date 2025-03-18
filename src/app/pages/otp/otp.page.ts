// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-otp',
//   templateUrl: './otp.page.html',
//   styleUrls: ['./otp.page.scss'],
// })
// export class OtpPage implements OnInit {

import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
// import Swal from 'sweetalert2';
import { IonicModule, Platform } from '@ionic/angular';
import { LoginPageService } from 'src/app/services/login-page.service';
import { CommonModule } from '@angular/common';

declare var SMS: any; // Declare the SMS plugin

@Component({
  selector: 'app-otp',
  imports: [ReactiveFormsModule, IonicModule, FormsModule, CommonModule],
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
  // standalone: false
})
export class OtpPage implements OnInit {
  testotp: any = 1234;
  send: boolean = false;
  otp: any = 6458; // Fixed OTP for demo
  fetchedData: any;
  responseData: any;
  public phnum: any = '';
  public displayMobileNumber: boolean = false; // To control mobile number visibility

  // OTP Form Group
  otpForm = new FormGroup({
    i1: new FormControl("", [Validators.required, Validators.pattern('^[0-9]$')]),
    i2: new FormControl("", [Validators.required, Validators.pattern('^[0-9]$')]),
    i3: new FormControl("", [Validators.required, Validators.pattern('^[0-9]$')]),
    i4: new FormControl("", [Validators.required, Validators.pattern('^[0-9]$')]),
    testname: new FormControl("", [Validators.required, Validators.pattern('^[0-9]$')])
  });

  @ViewChildren('i1, i2, i3, i4') inputs!: QueryList<ElementRef>;

  constructor(
    private router: Router,
    private api: LoginPageService,
    private platform: Platform
  ) {
    this.platform.ready().then(() => {
      this.requestSMSPermission();
    });
  }

  ngOnInit(): void {}

  // ✅ Show Entered Mobile Number
  showEnteredNumber() {
    this.displayMobileNumber = this.phnum.length >= 5; // Display when at least 5 digits entered
  }

  // ✅ Request SMS Permission
  requestSMSPermission() {
    if (this.platform.is('android') && SMS) {
      SMS.hasPermission((hasPermission: boolean) => {
        if (!hasPermission) {
          SMS.requestPermission(
            () => console.log('SMS permission granted'),
            (error: any) => console.error('SMS permission denied', error)
          );
        }
      });
    }
  }

  // ✅ Send OTP Function
  async sendOTP(ph: any) {
    console.log("getNumber",ph);
    this.phnum = (ph + '').replace(/\D/g, ''); // Remove non-numeric characters

    if (this.phnum.length < 5 || this.phnum.length > 10) {
      alert('Please enter a valid 10-digit phone number!');
      this.phnum = '';
      this.displayMobileNumber = false;
      return;
    }

    // Simulate API OTP call
    this.fetchedData = this.api.parseXmlToJson(await this.api.fetchOTP(this.phnum));

    this.responseData = (JSON.parse(JSON.stringify(this.fetchedData))["soap:Envelope"]["soap:Body"].ValidateOTPResponse.ValidateOTPResult['#text']).split('|');
    
    
    this.otp = this.responseData[1];
    console.log("otp resoponse",this.responseData)

    if (!this.otp) {
      alert('Client not found. Check your ClientID.');
      return;
    } else {
      this.send = true;
    }

    alert(`Your OTP is: ${this.otp}`); // Display OTP (for demo)
  }

  // ✅ Verify OTP Function
  verifyOTP() {
    const fm = this.otpForm.value;
    const otp = Number(`${fm.i1}${fm.i2}${fm.i3}${fm.i4}`);
    const test: any =  fm.testname
    alert("enterotp"+ fm.testname)
    if (test == this.otp) {
      localStorage.setItem("verified", this.responseData[6]);
      localStorage.setItem("ngrokURL", this.responseData[4]);
      localStorage.setItem("PublicURL", this.responseData[4]);
      this.router.navigate(['/login']);
    
    } else {
      alert("Wrong OTP! Please try again.");
    }
  }

  // ✅ OTP Input Navigation (Auto-focus on next input)
  valueEntered(event: KeyboardEvent) {
    const target = event.target as HTMLInputElement;
    if (event.key === 'Backspace') {
      const inputArray = this.inputs.toArray();
      for (let i = 0; i < this.inputs.length; i++) {
        if (!inputArray[i].nativeElement.value || inputArray[i].nativeElement == target.previousElementSibling) {
          inputArray[i].nativeElement.focus();
          return;
        }
      }
    }

    const nextInput = target.nextElementSibling as HTMLInputElement | null;
    if (target.value.length === 1 && nextInput) {
      nextInput.focus();
    }
  }

  formatOTP() {
    this.otp = this.otp.replace(/\D/g, ''); // Allow only numbers
    if (this.otp.length > 4) {
      this.otp = this.otp.slice(0, 4); // Limit to 4 digits
    }
  }

  resendOTP(){
    this.send = false;
  }















  
}

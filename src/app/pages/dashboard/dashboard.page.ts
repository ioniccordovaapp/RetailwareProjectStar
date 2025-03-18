import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginPageService } from 'src/app/services/login-page.service';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { NotificationService } from 'src/app/services/notification.service';
import { DashboardSharedService } from 'src/app/services/dashboard/dashboard-shared.service';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { MainapiService } from 'src/app/services/mainapi.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-dashboard',
  imports: [IonicModule, FormsModule, CommonModule],
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage {

  // minDate: string = new Date().toISOString(); // Current date as the minimum
  // maxDate: string = new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString(); // One year ahead

  selectdate: string = new Date().toISOString().split('T')[0]; // Set today's date by default
  dashboardStoreData: any = {};
  
  dashboardSellData: any = [];

  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);

  public appPages = [
    { title: 'Inbox', url: '/folder/inbox', icon: 'mail' },
    { title: 'Outbox', url: '/folder/outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/spam', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(private LoginService: LoginPageService,
    private route: ActivatedRoute,
    private dashboardservice: DashboardService,
    private router: Router,
    private notificationservice: NotificationService,
    private dashboardsharedservice: DashboardSharedService,
    public mainapi: MainapiService) { }

  ngOnInit() {
    this.onDateChange(this.selectdate);
    this.getSelldData();
  }

  onDateChange(newDate: string): void {
    this.selectdate = newDate;
    this.getDashboardData(newDate)
    // Call your API or perform selected date get data
  }

  onDivClick() {
    console.log("Sell Page Data", this.dashboardSellData)
    this.dashboardsharedservice.setSellData(this.dashboardSellData);
    this.router.navigate(['/sell']);
  }

  getDashboardData(selecteddate: string) {

    let query = `Proc_dashbordDataValue '${selecteddate}'`
    this.mainapi.MainApiCall(query).subscribe({
      next: data => {
        this.dashboardStoreData = data[0]; // Assign the received data to the property
      },
      error: err => {
        console.error('Error fetching posts:', err);
      }
    });


  }

  getSelldData(): void {
    let query = `Mobile_Proc_SaleRegister_Branchwise 1,1`
    this.mainapi.MainApiCall(query).subscribe({
      next: data => {
        this.dashboardSellData = data; // Assign the "Table1" array to the property
        console.log("Sell data:", this.dashboardSellData);
        this.notificationservice.hideLoader(); //
      },
      error: err => {
        console.error('Error fetching posts:', err);
      }
    });

  }

 
  selectedDate: string = ''; // Store selected date
  formattedDate: string = ''; // Store formatted date

  formatDate(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (!inputElement || !inputElement.value) return;

    const date = new Date(inputElement.value);
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'long', year: 'numeric' };
    this.formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
  }

}

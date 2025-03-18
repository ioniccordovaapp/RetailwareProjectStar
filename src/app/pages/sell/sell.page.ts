import { Component, OnInit } from '@angular/core';
import { DashboardSharedService } from 'src/app/services/dashboard/dashboard-shared.service';
import { CommonModule, DatePipe } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-sell',
  imports: [IonicModule, FormsModule,CommonModule ],
  templateUrl: './sell.page.html',
  styleUrls: ['./sell.page.scss'],
})
export class SellPage implements OnInit {
  getsellData: any[] = []; // Define a property to hold the data

  constructor(
    private dashboardsharedservice: DashboardSharedService,
    private datePipe: DatePipe // Inject DatePipe
  ) {}

  ngOnInit() {
    this.getsellData = this.dashboardsharedservice.getSellData();
    console.log("Get Data From Shared Service", this.getsellData);

    // Format the date in the desired format for each item in getsellData
    this.getsellData = this.getsellData.map(item => {
      item.Date = this.formatDate(item.Date);
      return item;
    });
  }

  // Method to format the date as 'dd-MMM-yy'
  formatDate(date: string): string {
    const formattedDate = this.datePipe.transform(date, 'dd-MMM-yy'); // '25-Jan-24'
    return formattedDate || date;
  }
}

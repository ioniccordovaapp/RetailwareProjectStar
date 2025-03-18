import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardSharedService {
  private sellData: any;

  constructor() { }

  setSellData(data: any) {
    this.sellData = data;
  }

 getSellData() {
    return this.sellData;
  }
  
}

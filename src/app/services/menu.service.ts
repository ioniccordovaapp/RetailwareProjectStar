import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private menuData = new BehaviorSubject<any[]>([]); // Holds the menu data

  setMenuData(data: any[]) {
    this.menuData.next(data); // Updates the menu data
  }

  getMenuData() {
    console.log(this.menuData);
    return this.menuData.asObservable(); // Observable for menu data
  }
}

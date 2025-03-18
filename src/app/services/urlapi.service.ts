import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlapiService {

  constructor() { }

  private apiUrl: string = '';  // Dynamic URL Storage

  setUrl(url: string) {
    this.apiUrl = url;
  }

  getUrl(): string {
    return this.apiUrl;
  }
  
}

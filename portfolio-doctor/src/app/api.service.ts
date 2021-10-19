import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
public encryptSecretKey: string = environment.TOKEN_SECRET;
public apiUrl: string = environment.url;
  constructor(public http:HttpClient) { }

  submitFormData(data:any) {
    return this.http.post(`${this.apiUrl}`, data);
  }
  encryptData(data:any) {
    try {
      data = JSON.stringify(data);
      return CryptoJS.AES.encrypt(data, this.encryptSecretKey).toString();
    } catch (e) {
      console.log(e,"Checking encrypt data error");
      return null;
    }
  }
}

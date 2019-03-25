import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl: string = 'http://localhost:8000';
  apiUrlProd: string = 'https://backen-develop.herokuapp.com'
  token: any;

  constructor(private http: HttpClient) { }

  sendToRestApiMethod(userData) : void {
    this.http.post(this.apiUrlProd + "/connect/google", {token : userData.idToken}).subscribe(
      onSuccess  => {
        localStorage.setItem('user', JSON.stringify(userData));
      }, onFail => {
        //TODO
      }
    );
  }
}

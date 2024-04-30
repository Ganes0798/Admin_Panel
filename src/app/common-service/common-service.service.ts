import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {

  baseUrl = 'https://localhost:5001/api/'
  constructor(private http: HttpClient) { }

    //User API
  getUser(){
     return this.http.get(`${this.baseUrl}User`);
  }

  AddUser(data: any){
    return this.http.post(`${this.baseUrl}User`, data);
  }
}

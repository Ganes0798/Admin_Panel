import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {

  baseUrl = 'https://localhost:5001/api/'
  constructor(private http: HttpClient) { }

    //User API
  getUser(): Observable<any>{
     return this.http.get(`${this.baseUrl}User`);
  }

  AddUser(data: any): Observable<any>{
    return this.http.post(`${this.baseUrl}User`, data);
  }

  DeleteUser(id:number): Observable<any>{
    return this.http.delete(`${this.baseUrl}User` + id);
  }


  //Category API
  getCategory(): Observable<any>{
    return this.http.get(`${this.baseUrl}Product/Category`);
  }

  //PRODUCT API
  getProduct():Observable<any>{
    return this.http.get(`${this.baseUrl}Product`);
  }
  addProduct(data:any):Observable<any>{
    return this.http.post(`${this.baseUrl}Product`, data);
  }
  updateProduct(data:any): Observable<any>{
    return this.http.patch(`${this.baseUrl}Product`, data);
  }
}

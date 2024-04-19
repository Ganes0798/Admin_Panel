import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  apiUrl = 'https://localhost:5001/api/'

  constructor(private http: HttpClient, private route: Router) { }



  loginAsAdmin(admin: any): Observable<any>{
    return this.http.post(`${this.apiUrl}Login`, admin);
  }


  LogoutAdmin(){
    localStorage.removeItem('token');
    this.route.navigate(['/login']);
  }
}
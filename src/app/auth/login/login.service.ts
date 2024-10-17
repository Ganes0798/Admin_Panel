import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  apiUrl = 'https://localhost:5001/api/'

  constructor(private http: HttpClient, private router: Router, private cookieStore: CookieService) { }



  loginAsAdmin(admin: any): Observable<any>{
    return this.http.post(`${this.apiUrl}Login`, admin);
  }
  getToken(): string | null {
    return this.cookieStore.get('token');
  }

  getUserRole(): string | null {
    const token = this.getToken();
    if (token) {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.role;
    }
    return null;
  }


  getUserName(): string | null {
    const token = this.getToken();
    if(token) {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.unique_name;
    }
    return null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout() {
    this.router.navigate(['/login']);
    return this.cookieStore.delete('token');
  }

  isTokenExpired(): boolean {
    const token = this.getToken();
    if (token) {
      const decodedToken: any = jwtDecode(token);
      const expirationTime = decodedToken.exp * 1000; // Convert to milliseconds
      return expirationTime < Date.now();
    }
    return true;
  }
}
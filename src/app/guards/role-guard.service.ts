import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { LoginService } from '../auth/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard {

  constructor(private authService: LoginService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data['expectedRole'];
    const userRole = this.authService.getUserRole();

    if (userRole !== expectedRole) {
      this.router.navigate(['/unauthorized']);
      return false;
    }
    return true;
  }
}

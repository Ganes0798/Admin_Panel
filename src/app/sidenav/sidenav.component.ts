import { Component, EventEmitter, Input, OnInit, Output, ViewChild, computed, signal } from '@angular/core';
import {MatSidenav, MatSidenavModule} from '@angular/material/sidenav'
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatStepperModule} from '@angular/material/stepper';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu'
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../auth/login/login.service';

export type RouteInfo = {
  icon: string;
  label: string;
  route: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  {
    icon: 'bx bx-grid-alt',
    label: 'Dashboard',
    route: '/dashboard',
    class: ''
  },
  {
    icon: 'bx bx-user',
    label: 'Users',
    route: '/users',
    class: 'Super Admin'
  },
  {
    icon: 'bx bx-chat',
    label: 'Products',
    route: '/products',
    class: ''
  },
  {
    icon: 'bx bx-cart-alt',
    label: 'Orders',
    route: '/orders',
    class: ''
  },

];

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule ,MatSidenavModule,MatToolbarModule,MatStepperModule,MatIconModule,  MatListModule, MatMenuModule,RouterModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent implements OnInit {
  isOpen: boolean = false;
  public isCollapsed = true;
  public menuItems: any[] = [];

  constructor(public authService: LoginService, private router: Router){}

  @Input() isSidebarOpen: boolean = true;
  sidenavCollapsed = signal(false);
  @Input() set collapsed (val: boolean)
  {
    this.sidenavCollapsed.set(val);
  }


  ngOnInit(): void {
    const userRole = this.authService.getUserRole();
    this.menuItems = ROUTES.filter((menuItem) => {
      
      if (userRole === "Admin") {
        return menuItem.class === "";
      }
      if (userRole === "SuperAdmin") {
        return menuItem.class !== "Admin";
      }
       else {
        return false;
      }
    });
    this.router.events.subscribe(() => {
      this.isCollapsed = true;
    });
  }
  

  profilePic = computed(() => this.sidenavCollapsed() ? '32' : '100');
 
}

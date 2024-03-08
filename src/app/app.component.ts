import { CommonModule } from '@angular/common';
import { Component, OnDestroy, computed, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { CustomSidenavComponent } from './admin/custom-sidenav/custom-sidenav.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { MatMenuModule } from '@angular/material/menu';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [ CommonModule,
      MatSidenavModule, 
      MatIconModule, 
      MatToolbarModule, 
      MatListModule,
      MatButtonModule,
    RouterModule,
  SidenavComponent,
  MatMenuModule]
})
export class AppComponent implements OnDestroy {
  isExpanded = true;
  collapsed = signal(false);
  sidenavWidth = computed(() => this.collapsed() ? '65px' : '250px');

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Check the current route and expand/collapse sidebar accordingly
        this.isExpanded = (event.url !== '/login');
      }
    });
  }

  isLoginPage(): boolean {
    return this.router.url === '/login';
  }





  ngOnDestroy(): void {
   
  }

}

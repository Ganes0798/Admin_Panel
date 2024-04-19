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
import {MatProgressBarModule} from '@angular/material/progress-bar'
import { LoaderService } from './loader/loader.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './loader/interceptor.service';
import {MatProgressSpinnerModule, ProgressSpinnerMode} from '@angular/material/progress-spinner'
import { ThemePalette } from '@angular/material/core';
import { LoginService } from './auth/login/login.service';

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
  MatMenuModule, MatProgressBarModule, MatProgressSpinnerModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true
    }
  ]
})
export class AppComponent implements OnDestroy {
  loading: boolean = true;
  progress: number = 0; 
  isExpanded = true;
  collapsed = signal(false);
  sidenavWidth = computed(() => this.collapsed() ? '65px' : '250px');

  constructor(private router: Router, public loaderService: LoaderService, public _loginService: LoginService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Check the current route and expand/collapse sidebar accordingly
        this.isExpanded = (event.url !== '/login');
      }
    }),
    setTimeout(() => {
      // Simulate data loaded
      this.loading = false;
    }, 3000);
  }

  isLoginPage(): boolean {
    return this.router.url === '/login';
  }

 

  startLoading() {
    // Set loading to true to show the progress bar
    this.loading = true;
    
    // Start increasing progress every second
    const interval = setInterval(() => {
      this.progress += 10; // Increment progress by 10
      
      // If progress reaches 100, stop the interval
      if (this.progress >= 100) {
        clearInterval(interval);
        this.loading = false; // Hide the progress bar
        this.progress = 0; // Reset progress
      }
    }, 1000);
  }



  ngOnDestroy(): void {
   
  }

}

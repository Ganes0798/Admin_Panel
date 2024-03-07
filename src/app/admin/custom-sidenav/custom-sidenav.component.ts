import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-custom-sidenav',
  standalone: true,
  imports: [CommonModule,MatToolbarModule, MatSidenavModule, MatIconModule, MatListModule, MatDrawer, MatMenuModule, RouterModule],
  templateUrl: './custom-sidenav.component.html',
  styleUrl: './custom-sidenav.component.scss'
})
export class CustomSidenavComponent {
  
  }

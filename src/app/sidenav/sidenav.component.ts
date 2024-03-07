import { Component, ViewChild } from '@angular/core';
import {MatSidenav, MatSidenavModule} from '@angular/material/sidenav'
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatStepperModule} from '@angular/material/stepper';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu'


@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [MatSidenavModule,MatToolbarModule,MatStepperModule,MatIconModule,  MatListModule, MatMenuModule,],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
 
}

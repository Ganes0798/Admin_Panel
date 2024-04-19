import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Chart, registerables } from 'chart.js';
import {MatTableModule} from '@angular/material/table'
import { CommonModule } from '@angular/common';

Chart.register(...registerables);



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,MatCardModule, MatIconModule, MatListModule, MatTableModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})


export class DashboardComponent implements OnInit {
  listData: any;

  ngOnInit(): void {
     this.listData = [
      {
        img: "assets/Images/A1.jpg",
        name: 'Ganesh M'
      },
       {
        img: "assets/Images/A1.jpg",
        name: 'Sivu'
      },
      {
        img: 'assets/Images/A1.jpg',
        name: 'Ramesh'
      }
     ]
  }
}

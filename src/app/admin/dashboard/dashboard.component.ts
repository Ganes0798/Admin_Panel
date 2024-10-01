import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Chart, registerables } from 'chart.js';
import {MatTableDataSource, MatTableModule} from '@angular/material/table'
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDrawer } from '@angular/material/sidenav';
import { CommonServiceService } from '../../common-service/common-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

Chart.register(...registerables);



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,MatCardModule, MatIconModule, MatListModule, MatTableModule, MatPaginatorModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})


export class DashboardComponent implements OnInit {
  listData: any;

  constructor(private _commonService: CommonServiceService, private _snackBar: MatSnackBar){}

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

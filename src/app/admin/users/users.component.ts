import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import {  MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { UserInputComponent } from './user-input/user-input.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MatButtonModule, MatSidenavModule, MatTableModule, MatPaginatorModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'role'];
  dataSource:any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(private dialog: MatDialog){}

    ngOnInit(): void{
      this.dataSource = [
        {
          firstName: 'ganesh',
          lastName: 'M',
          email: 'mganesh120798@gmail.com',
          role: 'user'
        }
      ]
  
    }

  openDialog() {
    this.dialog.open(UserInputComponent, {
    });
  }

  ngAfterViewInit(): void{
    this.dataSource.paginator = this.paginator;
  }


}

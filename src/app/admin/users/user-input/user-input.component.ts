import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [CommonModule,MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatTableModule, MatPaginatorModule, ReactiveFormsModule, MatSelectModule, MatOptionModule],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.scss'
})
export class UserInputComponent implements OnInit, AfterViewInit{
  userForm: any;

  

  constructor(private dialog: MatDialog, ){}

  ngOnInit(): void{

   

  }

  ngAfterViewInit(): void{
    }

  closeDialog()
  {
    this.dialog.closeAll();
  }
}

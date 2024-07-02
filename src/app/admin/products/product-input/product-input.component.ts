import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-product-input',
  standalone: true,
  imports: [CommonModule,MatDialogModule, MatFormFieldModule, MatOptionModule, MatSelectModule,MatInputModule,MatButtonModule, ReactiveFormsModule],
  templateUrl: './product-input.component.html',
  styleUrl: './product-input.component.scss'
})
export class ProductInputComponent implements OnInit {
  productForm: any;



  constructor(private _formBuilder: UntypedFormBuilder){}


  ngOnInit(): void{
   
  }


  closeDialog(){

  }
}

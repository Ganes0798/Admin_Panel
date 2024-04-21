import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-product-input',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatOptionModule, MatSelectModule,MatInputModule,MatButtonModule],
  templateUrl: './product-input.component.html',
  styleUrl: './product-input.component.scss'
})
export class ProductInputComponent {





  closeDialog(){

  }
}

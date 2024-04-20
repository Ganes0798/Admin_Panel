import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProductInputComponent } from './product-input/product-input.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, MatTableModule, MatPaginatorModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

  displayedColumns: string[] = ['productName', 'productDesc', 'productImage', 'productCategory'];
  dataSource:any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(private dialog: MatDialog){}

  ngOnInit(): void{
    this.dataSource = [
      {
        productName: 'ganesh',
        productDesc: 'M',
        productImage: '/assets/Images/Logo.png',
        productCategory: 'user'
      }
    ]

  }

ngAfterViewInit(): void{
  this.dataSource.paginator = this.paginator;
}
  openDialog() {
    this.dialog.open(ProductInputComponent, {
    });
  }
}

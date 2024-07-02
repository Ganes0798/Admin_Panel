import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProductInputComponent } from './product-input/product-input.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonServiceService } from '../../common-service/common-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { response } from 'express';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [MatButtonModule, 
            MatDialogModule, 
            MatTableModule, 
            MatPaginatorModule, 
            MatSidenavModule, 
            MatIconModule, 
            MatInputModule, 
            MatFormFieldModule, 
            ReactiveFormsModule, 
            MatSelectModule, 
            MatOptionModule, 
            CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

  displayedColumns: string[] = ['productName', 'productDesc', 'productImage', 'productCategory', 'action'];
  dataSource = new MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('drawer') drawer!: MatDrawer;
  button_text: any;
  drawer_title: any;
  productForm: any;
  categoryDetails: any[] = [];
  categoryName: any;
  id!: number;
  categoryByName: any;

  constructor(private dialog: MatDialog,private _commonService: CommonServiceService, private _snackBar: MatSnackBar, private _formBuilder: UntypedFormBuilder ){}

  ngOnInit(): void{
    this.getCategories();
   this.getProducts();
   this.formData();
  }

  formData(){
    this.productForm = this._formBuilder.group({
      productName: ['', Validators.required],
      productDesc: ['', Validators.required],
      productImageUrl: ['', Validators.required],
      productprice: ['', Validators.required],
      productTotal: ['', Validators.required],
      productCategory: ['', Validators.required]
    });
  }



  //API Section

  //Get API
  getProducts(){
    this._commonService.getProduct().subscribe({
      next: (response: any) => {
        if(response.code == 200 && response.success == true)
        {
          this.dataSource = response.result;
          this.categoryByName = response.result;
          console.log(this.categoryByName)
        }
      },
      error: (err:any) => {
             this._snackBar.open(err.message, 'undo', {
              duration: 2000
             })
      }
    })
  }
  //ADD API
  addProducts(data: any){
    const jsonInput = {
      "productName": data.productName,
      "productDescription": data.productDesc,
      "productImageUrl": data.productImageUrl,
      "productPrice": data.productprice,
      "totalProducts": data.productTotal,
      "categoryCode": data.productCategory
    }
    this._commonService.addProduct(jsonInput).subscribe({
      next:(response:any) => {
        if(response.code == 200 && response.success == true)
        {
          this._snackBar.open(response.message, 'undo', {
            duration: 3000
          });
          this.drawer.close();
          this.productForm.reset();
        }
      },
      error: (err:any) =>{
          this._snackBar.open(err.error);
      }
    })
  }
  //UPDATE API
  updateProducts(value: any, id:number){
    id = this.id;
     const jsonInput = {
      "id": this.id,
      "productName": value.productName,
      "productDescription": value.productDesc,
      "productImageUrl": value.productImageUrl,
      "productPrice": value.productprice,
      "totalProducts": value.productTotal,
      "categoryCode": value.productCategory
    }
    this._commonService.updateProduct(jsonInput).subscribe({
      next:(response:any) => {
        
        if(response.code == 200 && response.success == true)
        {
          this._snackBar.open(response.message, 'undo', {
            duration: 3000
          });
          this.drawer.close();
        }
      },
      error: (err:any) =>{
          this._snackBar.open(err.error);
      }
    })
  }

  //DELETE API
  //GET CATEGORY API
  getCategories(){
    this._commonService.getCategory().subscribe({
      next:(response:any) => {
        if(response.code == 200 && response.success == true)
        {
          localStorage.getItem('token');
            this.categoryDetails = response.result;
        }
      },
      error: (err:any) => {

      }
    })
  }
  //data Update
  formWithData(data: any){
    this.productForm = this._formBuilder.group({
      productName: [data.productName, Validators.required],
      productDesc: [data.productDescription, Validators.required],
      productImageUrl: [data.productImageUrl, Validators.required],
      productprice: [data.productPrice, Validators.required],
      productTotal: [data.totalProducts, Validators.required],
      productCategory: [data.categoryById.code, Validators.required]
    });
  }

  //Form Submit
  submit(form_type:string, data:any){
    this.drawer.open();
    if(form_type == 'add')
    {
      this.button_text = 'Add';
      this.drawer_title = 'Add Product';
      this.formData();
    }
    else if (form_type == 'update')
    {
       console.log(data);
      this.button_text = 'Update';
      this.drawer_title = 'Update Product';
      this.formWithData(data);
      this.id = data.id;
    }
    else
    {
      // this.button_text = false;
      this.drawer_title = 'View Product';
    }
}

formSubmit(){
  if(this.productForm.valid)
  {
    if(this.button_text == 'Add')
    {
      this.addProducts(this.productForm.value);
    }
    else
    {
      this.updateProducts(this.productForm.value, this.id)
    }
  }
  else{
    this._snackBar.open('Enter Value for All Fields', 'undo', {
      duration: 3000
    });
  }
 
}

ngAfterViewInit(): void{
  this.dataSource.paginator = this.paginator;
  this.paginator.pageSize = 10;
}
  openDialog() {
    this.dialog.open(ProductInputComponent, {
    });
  }
}

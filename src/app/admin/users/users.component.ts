import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import {  MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { UserInputComponent } from './user-input/user-input.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CommonServiceService } from '../../common-service/common-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { response } from 'express';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule,MatButtonModule, MatSidenavModule, MatTableModule, MatPaginatorModule, MatIconModule, MatFormFieldModule,MatInputModule, MatButtonModule, MatTableModule, MatPaginatorModule, ReactiveFormsModule, MatSelectModule, MatOptionModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'role', 'action'];
  dataSource = new MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('drawer') drawer!: MatDrawer;
  userRoles: any;
  userForm: any;
  button_text: any;
  drawer_title: any;

    constructor(private dialog: MatDialog, private _commonService: CommonServiceService, private _snackBar: MatSnackBar, private _formBuilder: UntypedFormBuilder ){
    }

    ngOnInit(): void{
     this.getUser();
     this.userForm = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['',Validators.required],
      conPassword: ['', Validators.required],
    });
    }

    addUserForm(){
      this.userForm = this._formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', Validators.required],
        password: ['',Validators.required],
        conPassword: ['', Validators.required],
      });
    }
    // updateUserForm(data:any){
    //   this.userForm = this._formBuilder.group({
    //     firstName: ['', Validators.required],
    //     lastName: ['', Validators.required],
    //     email: ['', Validators.required],
    //     password: ['',Validators.required],
    //     conPassword: ['', Validators.required],
    //     role: ['', Validators.required]
    //   });
    // }
  
    //Get User
    getUser(){
      this._commonService.getUser().subscribe({
        next:(response:any) => {
          if(response.code == 200 && response.success == true)
          {
            this.dataSource = response.result;
            console.log(this.dataSource)
          }
        },
        error:(err:any) => {
           this._snackBar.open(err.error, 'undo', {
                  duration: 3000
           });
        },
      })
    }

    //Add Users
    addUsers(data: any){
       const jsonInput = {
        "firstName": data.firstName,
        "lastName": data.lastName,
        "password": data.password,
        "confirmPassword": data.conPassword,
        "email": data.password,
        "roleName": data.role
      }
      console.log(jsonInput);
      this._commonService.AddUser(jsonInput).subscribe({
        next: (response: any) => {
           if(response.code == 200 && response.success == true)
           {
                 this._snackBar.open(response.message, 'undo',{
                  duration: 3000
                 })
           }
        },
        error:(err:any) =>
        {
          this._snackBar.open(err.error, 'undo',{
            duration: 3000
           })
        }
      })
    }


    submit(form_type:string){
        this.drawer.open();

        if(form_type == 'add')
        {
          this.button_text = 'Add';
          this.drawer_title = 'Add User';
          this.addUserForm();
        }
        else if (form_type == 'update')
        {
          this.button_text = 'Update';
          this.drawer_title = 'Update User';
        }
        else
        {
          this.button_text = false;
          this.drawer_title = 'View User';
        }
    }

    formSubmit(){
      if(this.userForm.valid)
      {
        if(this.button_text == 'Add')
        {
          this.addUsers(this.userForm.value);
        }
        else
        {
          console.log('update')
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


}

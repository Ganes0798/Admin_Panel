import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from './login.service';
import {MatSnackBar} from '@angular/material/snack-bar'
import { response } from 'express';
import { MatCardModule } from '@angular/material/card';
import { LoaderService } from '../../loader/loader.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [CommonModule,
    ReactiveFormsModule, 
    MatButtonModule, 
    MatDividerModule, 
    MatFormFieldModule, 
    MatIconModule,
    MatInputModule,
    FormsModule,
  RouterModule,
  MatCardModule]
})
export class LoginComponent implements OnInit {
  hide: any;
  loginForm: any;
  localToken: any;

  constructor(private _formBuilder: UntypedFormBuilder, 
              private _loginService: LoginService, 
              private _snackBar: MatSnackBar,
              private router: Router , public loader: LoaderService, private cookieStore: CookieService){}


  ngOnInit(): void {
         this.loginForm = this._formBuilder.group({
           email: ['', Validators.required],
           password: ['', Validators.required]
         });
         console.log(this.loader.isloading.value);
  }

  loginAdmin(data: any){
    const jsonInput ={
      "email": data.email,
      "password": data.password
    }
    this._loginService.loginAsAdmin(jsonInput).subscribe({
      next: (response: any) => {
        if(response.code == 200 && response.success == true)
         {
          this._snackBar.open(response.message, 'Undo', {
            duration: 3000
          });
            this.localToken = response.result.token
            this.cookieStore.set('token', this.localToken);
            this.router.navigate(['/dashboard']);
         }
         else{
          this._snackBar.open('Something Went Wrong');
         }
      },
      error: (err : any) => {
        this._snackBar.open(err.message, 'undo', {
          duration: 3000
        });
      }});
  }
}

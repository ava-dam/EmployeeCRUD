import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService, TokenPayload } from 'services/auth.service';
import { Employee } from '../view/view.component';
import { DataService } from 'services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private formbuilder: FormBuilder, private auth: AuthService, private router: Router, private snackbar: MatSnackBar, private data: DataService) {}
  loginForm!: FormGroup;
  credentials: TokenPayload = {
    id: '',
    email: '',
    password: ''
  };
  
  login() {
    console.log(this.credentials);
    this.auth.login(this.credentials).subscribe(() => {
    this.snackbar.open('Logged in!', 'OK', {duration: 1000});
    this.data.sendGetRequest(this.credentials.id).subscribe((res) => {
      this.auth.logIn(res.data.id);
      console.log(res.data.id);
    }, (err) => {
      console.error(err);
    })
    }, (err) => {
      console.error(err);
    });
    this.router.navigateByUrl('/dashboard');
  }
}

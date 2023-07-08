import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder, AbstractControl } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { DataService } from 'services/data.service';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { AuthService } from 'services/auth.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  today = new Date();
  profileForm!: FormGroup;
  message: string= '';
  constructor(private formbuilder: FormBuilder, private dataService: DataService, private router: Router, private snackBar: MatSnackBar, private auth: AuthService) {}
  ngOnInit() {
    this.profileForm = this.formbuilder.group({
      id: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: [''],
      dob: [''],
      add1: ['', Validators.required],
      add2: [''],
      city: [''],
      state: [''],
      zip:['',[this.EmployeeZipValidator]],
      dept:['', Validators.required]
    });
  }
  onSubmit() {
    console.log(this.profileForm.value);
    this.dataService.sendPostRequest(this.profileForm.value).subscribe(res => {
      console.log(res);
      this.openSnackBar('Employee Created!', 'OK');
    });
    this.router.navigateByUrl('/view');

  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {duration: 1000});
  }

  EmployeeZipValidator(control: AbstractControl): { [key: string]: boolean } | null { 
    if (control.value !== undefined && (isNaN(control.value) || control.value < 100000 || control.value > 999999)) {
       return { 'zip': true }; 
      }
      return null;
  }

  logOut(){
    if(this.auth.isLoggedIn()) {
      this.auth.logout();
    }
  }
  onReset() {
    this.profileForm.controls['id'].setValue('');
    this.profileForm.controls['firstname'].setValue('');
    this.profileForm.controls['lastname'].setValue('');
    this.profileForm.controls['dob'].setValue('');
    this.profileForm.controls['add1'].setValue('');
    this.profileForm.controls['add2'].setValue('');
    this.profileForm.controls['city'].setValue('');
    this.profileForm.controls['state'].setValue('');
    this.profileForm.controls['zip'].setValue('');
  }

  goHome() {
    this.router.navigateByUrl('/view');
  }
}

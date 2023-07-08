import { Component, OnInit } from '@angular/core';
import { AuthService, TokenPayload } from 'services/auth.service';
import { Router } from '@angular/router';
import { DataService } from 'services/data.service';
import { Employee } from '../view/view.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  id: string = '';
  regForm!: FormGroup;
  today = new Date();
  charArr: Array<string> = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
  numArr: Array<string> = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
  generateId() {
     this.id = this.charArr[Math.floor(Math.random()*10)];
    for(let i=0; i<6; i++){
      this.id = this.id + this.numArr[Math.floor(Math.random()*10)];
    }
    return this.id;
  }
  // credentials: Employee = {
  //   id: `${this.generateId()}`,
  //   email: '',
  //   firstname: '',
  //   lastname: '',
  //   dob: '',
  //   add1: '',
  //   add2: '',
  //   city: '',
  //   state: '',
  //   zip:'',
  //   dept:'',
  //   password: '',
  //   role: ''
  // };

  constructor(private auth: AuthService, private router: Router, private dataService: DataService, private formbuilder: FormBuilder) {}

  ngOnInit() {
    this.regForm = this.formbuilder.group({
      id: [this.generateId()],
      email: ['', [Validators.required]],
      firstname: ['', [Validators.required]],
      lastname: [''],
      dob: ['', [Validators.required]],
      add1: ['', [Validators.required]],
      add2: [''],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      zip: ['', [Validators.required, Validators.minLength(6)]],
      dept: ['', [Validators.required]],
      password: ['', [Validators.required]],
      role: ['', [Validators.required]]
    });
  }

  register() {
    console.log(this.regForm.value);
    this.auth.register(this.regForm.value).subscribe(() => {
      this.router.navigateByUrl('/'); // go to login component
    }, (err) => {
      console.error(err);
    });
  }
}

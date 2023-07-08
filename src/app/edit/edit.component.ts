import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DataService } from 'services/data.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  today = new Date();
  editForm!: FormGroup;
  data: any;
  constructor(private formbuilder: FormBuilder, private dataservice: DataService, private router: Router, private activatedRoute: ActivatedRoute, private snackbar: MatSnackBar) {}
  ngOnInit() {
    //console.log(id);
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.data = this.getData(id);
    this.editForm = this.formbuilder.group({
      id: ['', [Validators.required]],
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      add1: ['', [Validators.required]],
      add2: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      zip:['', [Validators.required, Validators.minLength(6)]],
      dept:['', [Validators.required]]
    });
    
  }
  onSubmit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.editForm.value);
    this.dataservice.sendPutRequest(id, this.editForm.value).subscribe(res => {
      console.log(res);
    });
    this.router.navigateByUrl('/view');
    this.snackbar.open('Employee Details Edited!', 'OK', {duration: 2000});
  }

  getData(id: any) {
    this.dataservice.sendGetRequest(id).subscribe((res) => {
      console.log(res);
      this.data = res.data;
      this.editForm.setValue({
        id: res.data.id,
        firstname: res.data.firstname,
        lastname: res.data.lastname,
        dob: res.data.dob,
        add1: res.data.add1,
        add2: res.data.add2,
        city: res.data.city,
        state: res.data.state,
        zip:res.data.zip,
        dept:res.data.dept,
      });
    });
  }

  reset() {
    this.editForm.controls['firstname'].setValue('');
    this.editForm.controls['lastname'].setValue('');
    this.editForm.controls['dob'].setValue('');
    this.editForm.controls['add1'].setValue('');
    this.editForm.controls['add2'].setValue('');
    this.editForm.controls['city'].setValue('');
    this.editForm.controls['state'].setValue('');
    this.editForm.controls['zip'].setValue('');
  }
}

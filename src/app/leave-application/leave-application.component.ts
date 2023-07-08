import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'services/data.service';

@Component({
  selector: 'app-leave-application',
  templateUrl: './leave-application.component.html',
  styleUrls: ['./leave-application.component.css']
})
export class LeaveApplicationComponent implements OnInit {
  leaveForm!: FormGroup;
  leaveData: any = {
    id: localStorage.getItem('user-id'),
    leaveStart: '',
    leaveEnd: '',
    leavesTaken: '',
    leaveReason: '',
  }

  constructor(private formbuilder: FormBuilder, private data: DataService, private router: Router) {}
  ngOnInit(): void {
    this.leaveForm = this.formbuilder.group({
      leaveStart: ['', Validators.required],
      leaveEnd: ['', Validators.required],
      leaveReason: ['', Validators.required]
    })
  }

  async onSubmit(){
    this.leaveData.leaveStart = this.leaveForm.value.leaveStart.toISOString();
    this.leaveData.leaveEnd = this.leaveForm.value.leaveEnd.toISOString();
    this.leaveData.leavesTaken = this.calcDuration(this.leaveForm.value.leaveStart, this.leaveForm.value.leaveEnd);
    this.leaveData.leaveReason = this.leaveForm.value.leaveReason;
    console.log(this.leaveData);
    this.data.addLeave(this.leaveData).subscribe((res) => {
      console.log(res);
    })

  }

  calcDuration(leaveStart: any, leaveEnd: any) {
    console.log((leaveEnd-leaveStart)/ (1000 * 60 * 60 * 24));
    return (leaveEnd-leaveStart)/ (1000 * 60 * 60 * 24);
  }
}

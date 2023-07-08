import { OnInit, Component, Input } from '@angular/core';
import { Employee } from '../view/view.component';
import { AuthService } from 'services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from 'services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private router: Router, private snackbar: MatSnackBar, private data: DataService, private auth: AuthService) {}
  user: Employee = {
    id: '',
    firstname: '',
    lastname: '',
    email: '',
    add1: '',
    add2: '',
    city: '',
    state: '',
    dob: '',
    zip: '',
    dept: '',
    role: '',
  }
  leaves: any;
  totalLeaves: any;
  leavesTaken: any;
  ngOnInit() {
    let id = localStorage.getItem('user-id');
    console.log(id);
    this.data.sendGetRequest(id).subscribe((res) => {
      this.user = res.data;
      console.log(this.user);
    });

    this.data.getLeaveData(id).subscribe((res) => {
      this.leaves = res.data;
      console.log(this.leaves);
    });

    this.totalLeaves = this.getLeaveStats(this.leaves).totalLeaves;
    this.leavesTaken = this.getLeaveStats(this.leaves).leavesTaken;
  }

  edit() {
    this.router.navigate(['/edit', {id: this.user.id}]);
  }

  apply() {
    this.router.navigate(['/leave-application'])
  }

  getLeaveStats(leaves: any) {
    let totalLeaves = leaves.totalLeaves;
    var leavesTaken = 0;
    for(let i=0; i<leaves.length; i++) {
      leavesTaken+=leaves[i].leavesTaken;
    }
    return {totalLeaves, leavesTaken};
  }
}

import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from 'services/data.service';
import { MatCellDef } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { AbstractControl } from '@angular/forms';
import { MatSort, Sort } from '@angular/material/sort';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { AuthService } from 'services/auth.service';
import { MatSidenav } from '@angular/material/sidenav';

export interface Employee {
  email?: string;
  password?: string;
  firstname?: string;
  role?: string;
  id?: string;
  lastname?: string;
  dob?: string;
  add1?: string;
  add2?: string;
  city?: string;
  state?: string;
  zip?: string;
  dept?: string;
}

var ELEMENT_DATA: Employee[] = [];
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})


export class ViewComponent implements OnInit, AfterViewInit {
  employee: Employee[] = [];
  public displayedColumns: string[] = ['serialno', 'id', 'firstname', 'lastname', 'dept', 'address', 'state', 'edit', 'delete'];
  public dataSource = new MatTableDataSource<any>();
  public data: any = [];

  // dependency injection
  constructor(private dataService: DataService, private router: Router, private snackbar: MatSnackBar, private _liveAnnouncer: LiveAnnouncer, private auth: AuthService) {  
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort | undefined;

  ngOnInit() {
    this.getEmployees();
    
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  getEmployees() {
    this.dataService.sendGetRequest()
      .subscribe((res) => {
        console.log(res.data);
        this.dataSource.data = res.data;
        // this.data = res;
        // console.log(this.data);
        // this.dataSource.data = this.data;
        // console.log(this.dataSource.data);
      });
      //this.dataSource.sort = this.sort;
  }

  editView(element: any) {
    console.log('button clicked!');
    this.router.navigate(['/edit', {id: element.id}]);
  }

  delete(empId: number) {
    if(!this.auth.isAdmin()) {
      this.router.navigateByUrl('/error');
    }
    else {
      console.log('delete clicked');
      this.dataService.delete(empId).subscribe((res) => {
      console.log(res);
    });
    this.getEmployees();
    this.snackbar.open('Employee Deleted!', 'OK', {duration:2000});
    }
  }

  goHome(){
    this.router.navigate(['home']);
  }

  logOut(){
    if(this.auth.isLoggedIn()) {
      this.auth.logout();
    }
  }
}

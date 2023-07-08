import { Injectable, ErrorHandler } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Employee } from 'src/app/view/view.component';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private REST_API_SERVER = "http://localhost:3000/api/employees";
  private LEAVES_API = "http://localhost:3000/api/leave";
  constructor(private httpClient: HttpClient) { }
  public sendGetRequest(id?: any): Observable<any> {
    if(id){
      return this.httpClient.get(this.REST_API_SERVER.concat(`/${id}`));
    }
    else {
      return this.httpClient.get(this.REST_API_SERVER);
    } 
  }
  public sendPostRequest(employee: Employee) {
    console.log(employee);
    return this.httpClient.post<Employee[]>(this.REST_API_SERVER, employee);
  }

  public delete(empId: number): Observable<any> {
    console.log(this.REST_API_SERVER.concat(`/${empId}`));
    return this.httpClient.delete(this.REST_API_SERVER.concat(`/${empId}`));
  }

  public sendPutRequest(empId: any, employee: Employee[]) {
    return this.httpClient.put(this.REST_API_SERVER.concat(`/${empId}`), employee);
  }

  public getLeaveData(empId: any): Observable<any> {
    return this.httpClient.get(this.LEAVES_API.concat(`/${empId}`));
  }

  public addLeave(leaveRequest: any) {
    return this.httpClient.post(this.LEAVES_API.concat(`/add-leave`), leaveRequest);
  }
}

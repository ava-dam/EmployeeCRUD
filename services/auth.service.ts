import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Employee } from 'src/app/view/view.component';

export interface UserDetails {
  _id: string;
  email: string;
  name: string;
  role: string;
  exp: number;
  iat: number;
}

interface TokenResponse {
  token: string;
}

export interface TokenPayload {
  email?: string;
  password: string;
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

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class AuthService {
  private token!: string;
  public id!: string; 
  constructor(private http: HttpClient, private router: Router) {
  }

  private saveToken(token: string): void {
    localStorage.setItem('mean-token', token);
    this.token = token;
  }

  public logIn(id: string) : void {
    localStorage.setItem('user-id', id);
    console.log(id);
    this.id = id;
  }
  private getToken(): string {
    if(!this.token) {
      console.log('No token');
      this.token = localStorage.getItem('mean-token') || 'abc';
    }
    return this.token;
  }

  public getUserDetails() {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      try {
        payload = window.atob(payload);
        console.log(payload);
      } catch (err) {
        this.router.navigateByUrl('');
        console.error(err);
      }
      return JSON.parse(payload);
    } else {
      console.log('Could not parse token');
      return null;
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000; // Expriy > now? true else false
    } else {
      return false;
    }
  }

  public isAdmin(): boolean {
    const user = this.getUserDetails();
    if(user.role === 'Admin') {
      console.log(user.role);
      return true;
    } else {
      return false;
    }
  }
  private request(method: 'post' | 'get', type: 'login' | 'register', user?: Employee): Observable<any> {
    let base: any;
    // const headerDict = {
    //   'Content-Type': 'application/json',
    //   'Authorization': `Bearer ${this.getToken()}`,
    // }
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getToken()}` });

    let options = { headers: headers };

    if (method === 'post') {
      base = this.http.post( `http://localhost:3000/api/employees/${type}`, user, options);
    } else {
      console.log('invalid request');
    }

    const request = base.pipe(
      map((data: TokenResponse) => {
        if(data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );
    return request;
  }

  public register(user: Employee): Observable<any> {
    return this.request('post', 'register', user);
  }

  public login(user: Employee): Observable<any> {
    return this.request('post', 'login', user);
    console.log(user);
  }

  // public profile(): Observable<any> {
  //   return this.request('get', 'profile');
  // }

  public logout(): void {
    //console.log(this.token);
    this.token = '';
    this.id = '';
    window.localStorage.removeItem('mean-token');
    window.localStorage.removeItem('user-id');
    this.router.navigateByUrl('/'); // takes you to login page
  }
}

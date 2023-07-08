import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate() {
    if(this.router.url == '/dashboard') {
      return true;
    } else if(!this.auth.isAdmin()) {
      this.router.navigateByUrl('/error');
      return false;
    }
    return true;
  }
}

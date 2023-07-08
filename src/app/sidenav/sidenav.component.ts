import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'services/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
@Output() closeSideNav = new EventEmitter();
  constructor(private auth: AuthService) { }

    onToggleClose() {
      this.closeSideNav.emit();
    }

    ngOnInit() {
      
    }

    logOut() {
      if(this.auth.isLoggedIn()) {
        this.auth.logout();
      }
    }
}


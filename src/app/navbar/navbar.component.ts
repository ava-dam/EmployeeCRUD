import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Output() SideNavToggle = new EventEmitter();

  openSideNav() {
    this.SideNavToggle.emit();
    console.log(this.SideNavToggle);
  }
}

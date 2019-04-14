import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  user: any;

  constructor(private authentication: AuthenticationService) {
    this.authentication.currentUser.subscribe(user => this.user = user);
  }

  signOut(): void {
    this.authentication.logout();
  }
}

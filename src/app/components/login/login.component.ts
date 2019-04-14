import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  faGoogle = faGoogle;
  user: any;

  constructor(private authentication: AuthenticationService, private router: Router) {
    this.authentication.currentUser.subscribe(user => this.user = user);
  }

  signInWithGoogle(): void {
    this.authentication.signInWithGoogle();
  }

  signOut(): void {
    this.authentication.logout();
  }

  ngOnInit() {
    if(this.user) {
      this.router.navigate(['']);
    }
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService implements CanActivate {

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  apiUrl: any = environment.baseUrl;
  token: any;

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('user')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((userData) => {
      this.http.post(this.apiUrl + "/connect/google", {token : userData.idToken}).subscribe(
        onSuccess  => {
          localStorage.setItem('user', JSON.stringify(userData));
          this.currentUserSubject.next(userData);
          this.router.navigate(['']);
        }, onFail => {
          //TODO
        }
      );
    });
  }

  logout(): void {
    this.authService.signOut().then(() =>  {
      localStorage.removeItem('user');
      this.currentUserSubject.next(null);
    });
  }

  isAuthenticated(): boolean {
    if(localStorage.getItem('user')) {
      return true;
    }
    return false;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isAuth = this.isAuthenticated();
    if(!isAuth){
      this.router.navigate(['/login'])
    }
    return isAuth;
  }
}

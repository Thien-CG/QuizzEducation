import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private router: Router) { }

  public isLogin(): boolean {
    const token = localStorage.getItem('token');
    const helper = new JwtHelperService();
    if (token && helper.isTokenExpired(token)) {
      return true;
    }
    return false;
  }


  public loginOut() : void {
    localStorage.setItem('token', '');
    this.router.navigate(['/login']);
  }

}

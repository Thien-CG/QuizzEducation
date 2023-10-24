import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorUrlGuard implements CanActivate {

  // khai báo router để chuyển trang
  constructor(private router: Router, private httpClient: HttpClient) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = localStorage.getItem('token');
    const helper = new JwtHelperService();

    if (!token || helper.isTokenExpired(token)) {
      this.router.navigate(['/**']);
      return false;
    }

    if (state.url.includes('user') && token) {
        const data = JSON.parse(helper.decodeToken(token).sub);
        if (!data.vaiTro.tenVaiTro.includes('Học sinh')) {
            this.router.navigate(['/**']);
             return false;
        }
    }

    if (state.url.includes('admin') && token) {
      const data = JSON.parse(helper.decodeToken(token).sub);
      if (!data.vaiTro.tenVaiTro.includes('Admin')) {
            this.router.navigate(['/**']);
             return false;
        }
    }
    
     if (state.url.includes('teacher') && token) {
        const data = JSON.parse(helper.decodeToken(token).sub);
        if (!data.vaiTro.tenVaiTro.includes('Giáo viên')) {
          this.router.navigate(['/**']);
          return false;
        }
     }
    return true;
  }

}

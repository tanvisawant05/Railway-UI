import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard2 implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['home']);
      return false;
    } else {
      return true;
    }
    //If the user is logged in (isLoggedIn method of AuthService returns true), the user is redirected 
    //to the 'home' route and the route activation is denied (returns false) else the route activation is allowed (returns true)
  }

}






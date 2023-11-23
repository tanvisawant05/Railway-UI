import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard1 implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
//The canActivate method is implemented from the CanActivate interface and takes the ActivatedRouteSnapshot and RouterStateSnapshot as parameters.
// It returns a boolean indicating whether the route can be activated.
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    //Inside the canActivate method, the isLoggedIn method of AuthService is called to check if the user is logged in.
    if (this.authService.isLoggedIn()) {
      return true;
      //If the user is logged in (isLoggedIn method of AuthService returns true), the route activation is allowed (returns true).
    } else {
      this.router.navigate(['signin']);
      return false;
      //If the user is not logged in, the user is redirected to the 'signin' route and the route activation is denied (returns false).
    }
  }
}



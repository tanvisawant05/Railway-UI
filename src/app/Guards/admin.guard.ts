import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { UserdataService } from '../Services/userdata.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardAdmin implements CanActivate {
  userRole:string="";
  constructor(private authService: AuthService, private router: Router, private userData: UserdataService, private auth:AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    //The canActivate method is implemented from the CanActivate interface and takes the ActivatedRouteSnapshot and RouterStateSnapshot as parameters.
    // It returns a boolean indicating whether the route can be activated.
    this.userData.getRoleFromStore().subscribe(val=>{
      let userRoleFromToken=this.auth.getRoleFromToken();
      this.userRole=val || userRoleFromToken;
    });
    //Inside the canActivate method, the getRoleFromStore method from UserdataService is used to retrieve the user's role from the store.
    // If the role is not available from the store, it falls back to the role extracted from the JWT token using the getRoleFromToken method of AuthService.
    if (this.authService.isLoggedIn() && this.userRole=="Admin") {
      return true;
      //If the user is logged in (isLoggedIn method of AuthService returns true) and the user role is "Admin", the route activation is allowed (returns true).
    } else {
      this.router.navigate(['signin']);
      return false;
      //If the user is not logged in or the user role is not "Admin", the user is redirected to the 'signin' route and the route activation is denied (returns false)
    }
  }
}

export const authGuard: CanActivateFn = (route, state) => {
  return true;
};
//The authGuard constant is a simple CanActivateFn function that returns true unconditionally. 
//It seems to be unrelated to the AuthGuardAdmin class and may not be necessary.
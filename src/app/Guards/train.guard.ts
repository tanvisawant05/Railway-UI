import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { UserdataService } from '../Services/userdata.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardTrain implements CanActivate {
  userRole:string="";
  constructor(private authService: AuthService, private router: Router, private userData: UserdataService, private auth:AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.userData.getRoleFromStore().subscribe(val=>{
      let userRoleFromToken=this.auth.getRoleFromToken();
      this.userRole=val || userRoleFromToken;
    });
    //Inside the canActivate method, the getRoleFromStore method of UserdataService is called to retrieve the user's role from the store.
    // If the role is not available in the store, the getRoleFromToken method of AuthService is used.
    if (this.authService.isLoggedIn() && this.userRole=="Admin") {
      return true;
    } else {
      this.router.navigate(['signin']);
      return false;
    }
    //If the user is logged in and the user role is "Admin", the route activation is allowed else the user is redirected to the 'signin' route and
    // the route activation is denied 
  }
}

export const authGuard: CanActivateFn = (route, state) => {
  return true;
};

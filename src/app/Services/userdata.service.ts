import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserdataService {
  private username$ = new BehaviorSubject<string>("");
  private role$ = new BehaviorSubject<string>("");
  private email$ = new BehaviorSubject<string>("");
  private userid$ = new BehaviorSubject<string>("");
  constructor() { }

  getUserIdFromStore(){
    return this.userid$.asObservable();
  }
  setUserIdForStore(userid:string){
    this.userid$.next(userid);
  }

  getUsernameFromStore(){
    return this.username$.asObservable();
  }
  setUsernameForStore(username:string){
    this.username$.next(username);
  }

  getRoleFromStore(){
    return this.role$.asObservable();
  }
  setRoleForStore(role:string){
    this.role$.next(role);
  }

  getEmailFromStore(){
    return this.role$.asObservable();
  }
  setEmailForStore(email:string){
    this.email$.next(email);
  }

//The service provides getter methods (getUserIdFromStore(), getUsernameFromStore(), getRoleFromStore(), getEmailFromStore()) 
//that return the observables corresponding to the stored data. 

//The service provides setter methods (setUserIdForStore(), setUsernameForStore(), setRoleForStore(), setEmailForStore()) 
//that update the values stored in the corresponding BehaviorSubject observables. 
//These methods are used to update the user data when needed.
}

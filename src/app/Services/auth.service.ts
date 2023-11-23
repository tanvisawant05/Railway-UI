import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private baseUrl:string="https://railway-api.azurewebsites.net/api/";
 //private baseUrl:string="https://localhost:44348/api/";
  private userPayload:any;

  constructor(private http:HttpClient, private router:Router) {}
  signup(userObj:any){
    return this.http.post<any>(`${this.baseUrl}Authenticate/User_register`, userObj);
  }
  //sends a post request to the server to register a new user

  login(loginObj:any){
    return this.http.post<any>(`${this.baseUrl}Authenticate/login`, loginObj);
  }
  //sends a post request to the server to authenticate a user and retrieve a token

  signOut(){
    localStorage.clear();
    this.router.navigate(['signin']);
  }
  //Clears the authentication token from local storage and navigates the user to the sign-in page

  search(searchObj:any){
    return this.http.post<any[]>(`${this.baseUrl}Search/Search`, searchObj);
  }
  //sends a post request to search for trains based on the provided search criteria

  isLoggedIn():boolean{
    return (!!localStorage.getItem("token")); // 2 exclamation marks to convert string to boolean
  }
  //Checks if the user is currently logged in by verifying the presence of a token in local storage.

  setToken(token:string){
    localStorage.setItem("token", token);
  }
  // Sets the authentication token in local storage

  getToken(){
    return localStorage.getItem("token");
  }
  //Retrieves the authentication token from local storage

  getAuthorizationHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.getToken()}`
    });
  }
  //Generates the headers needed for authorized requests. It includes the authentication token in the Authorization header.

 

  getTrainById(id:number){
    return this.http.get(`${this.baseUrl}TrainDetail/id?id=${id}`);
  }
  //sneds a get request to retrieve train details by specified id

  bookTicket(bookObj:any){
    const headers = this.getAuthorizationHeaders();
    return this.http.post<any>(`${this.baseUrl}Booking`, bookObj, {headers});
  }
  //sends a post request to book a ticket

  addAdmin (railwayObj:any){
    return this.http.post<any>(`${this.baseUrl}Authenticate/register_Admin`, railwayObj);
  }
  //sends a post request to add admin user

  GetAllTrains(){
    return this.http.get(`${this.baseUrl}TrainDetail/GetAllTrains`);
  }
  //get request to retrieve trains

  deleteTrain(id: number){
    return this.http.delete(`${this.baseUrl}TrainDetail/${id}`);
  }
  //deelete request to delete a train by specified id

  cancelBooking(TicketNo:number){
    return this.http.delete(`${this.baseUrl}Booking/${TicketNo}`);
  }

  addTrain(trainObj:any){
    return this.http.post<any>(`${this.baseUrl}TrainDetail`, trainObj);
  }
  //post req to add a new train


  decodedToken(){
    const jwtHelper = new JwtHelperService();
    const token = this.getToken();
    return jwtHelper.decodeToken(token!);
  }
  //Decodes the authentication token using the JwtHelperService from the @auth0/angular-jwt library. It returns the decoded token payload.

  getUserIdFromToken(){
    if(this.userPayload){
      return this.userPayload["jti"];
    }
  }
  //Retrieves the user ID from the token payload.
  //The "jti" claim is typically used to represent the unique identifier of the token

  getUsernameFromToken(){
    if(this.userPayload){
      return this.userPayload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
    }
  }
  //Retrieves the username from the token payload.


  getRoleFromToken(){
    if(this.userPayload){
      return this.userPayload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    }
  }
  //Retrieves the user role from the token payload.

  updateTrain(trainObj:any){
    return this.http.put(`${this.baseUrl}TrainDetail`, trainObj);
  }


}

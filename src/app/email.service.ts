import { Injectable } from '@angular/core';
import { email } from '../app/email.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';//


@Injectable({
  providedIn: 'root'
})
export class EmailService {

  emailSendUrl : string ="https://railway-api.azurewebsites.net/api/Email"
  //emailSendUrl : string ="https://localhost:44348/api/Email"
  DataEmail : email = new email();
  //http: any;//

  constructor(private myHttp : HttpClient) { }




  SendEmail(){
   return this.myHttp.post (this.emailSendUrl , this.DataEmail);
  }

  // sendPassengerDetails(passengerDetails: any): Observable<any> {    //
  //   return this.http.post(`${this.emailSendUrl}/send-email`, passengerDetails); //
  // }   //

}
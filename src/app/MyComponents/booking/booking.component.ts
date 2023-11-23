import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AuthService } from 'src/app/Services/auth.service';
import { EmailService } from 'src/app/email.service';
import { MatDialog } from '@angular/material/dialog';
import { BookingDialogComponent } from 'src/app/booking-dialog/booking-dialog.component';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent {
  [x: string]: any;
  userName: string="";
  age: string="";
  gender: string="";
  ticketType: string="";
  uemail:string="";

  
  
  TrainNo: number=0;
  
  TicketNo !: number;
  //displayed:boolean=false;
 
  body : string="Congratulations! Your Ticket has been Booked Successfully";
  //body : string="this.Name";

  // sendPassengerDetails() { //
  //   this['EmailService'].sendPassengerDetails(this['passengerDetails']) ///
  //     .subscribe((response: any) => { ///
  //       // Handle response from the server (email sent successfully or not)
  //     }); //
  // } //

  row:any;
  callBothFunctions(): void {
    this.displayValues();
    this.SEmail();
    //this.sendPassengerDetails(); 
    
    //this.onSubmit();
  }
  // openDialog(): void {
    
  //     this.dialog.open(BookingDialogComponent, {
  //     width: '450px',
  //     height: '200px',
    
  //   });
  // }
  
  // displayValues(){
  //   this.displayed=true;
  // }

  displayValues() {
    
    
  }
  

  private routeSubscription!: Subscription;
  constructor(private route:ActivatedRoute, private auth:AuthService, private router:Router, public email:EmailService, private dialog: MatDialog, private toast :NgToastService ){
    
  }

  
  ngOnInit() {
    this.routeSubscription = this.route.queryParamMap.subscribe(params => {
      this.TrainNo = Number(params.get('id'));
    });
     
      this.auth.getTrainById(this.TrainNo).subscribe({
        next:(res)=>{
          this.row=res;
        },
        error:(err)=>{
          this.row=null;
         
          alert("Error");
        }
      });
  }
  onSubmit(){
    
    console.log("submit called")
      let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (this.userName.trim() == "" || this.age.trim() == ""  || this.uemail.trim() == ""  || this.gender.trim() == ""  || this.ticketType.trim() == "" ) {
        alert("Please Enter All The Details!");
        
      }
      else if (!this.uemail.trim().match(mailformat)) {
        alert("Please Enter a Valid Email ID!");
       
      }
      
    else{
    console.log(this.userName+" "+this.age+" "+this.uemail+" "+this.gender+" "+this.ticketType+" "+this.TrainNo);
    this.auth.bookTicket({
      userName: this.userName,
      age: this.age,
      uemail:this.uemail,
      gender: this.gender,
      ticketType: this.ticketType,
      TrainNo: this.TrainNo
    }).subscribe({
      next:(res)=>{ 
        console.log(res.bookingId)
        this.TicketNo=res.bookingId
        console.log(this.TicketNo+" ticketNo")
        //alert("Ticket booked Successfully and email sent");
        this.toast.success({detail:"SUCCESS", summary:"Ticket Booked Successfully!",duration:3000})
        //console.log(this.TicketNo+"aaja")
    this.router.navigate(['cancel-booking', { userName: this.userName, age:this.age, uemail:this.uemail, gender:this.gender, ticketType:this.ticketType, ticketNo:this.TicketNo} ]);
        
      },
      error:(err)=>{
       
        alert("Error");
      }
    });
  }
}
  
  

SEmail(){
  this.email.DataEmail.email=this.uemail;
  this.email.DataEmail.body=this.body;
  this.email.SendEmail().subscribe(a=>{});
}
}


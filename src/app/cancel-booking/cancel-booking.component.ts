import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-cancel-booking',
  templateUrl: './cancel-booking.component.html',
  styleUrls: ['./cancel-booking.component.css']
})
export class CancelBookingComponent {

  userName: string | null;
  age: string | null;
  gender: string | null;
  ticketType: string | null;
  uemail:string | null;
  TrainNo: number=0;
  
  TicketNo : number=0;
 
  selectedOption: string = 'yes'; // Default option


  constructor(private route:ActivatedRoute, private auth:AuthService, private router:Router, private toast :NgToastService ){
    this.userName = this.route.snapshot.paramMap.get('userName');
    this.age = this.route.snapshot.paramMap.get('age');
    this.gender = this.route.snapshot.paramMap.get('gender');
    this.ticketType = this.route.snapshot.paramMap.get('ticketType');
    this.uemail = this.route.snapshot.paramMap.get('uemail');
    this.TicketNo=Number(this.route.snapshot.paramMap.get('ticketNo'));
  }

  
  
  noCancel(){
    this.router.navigate(["home"]);
  }

  cancelBooking(TicketNo:number){

   
    if (confirm("Do you want to cancel")) 
     
    {
      console.log(TicketNo)
      this.auth.cancelBooking(this.TicketNo).subscribe({
        next:(res)=>{
          
          //alert('Cancelled successfully!')
          this.toast.success({detail:"SUCCESS", summary:"Cancelled Successfully!",duration:5000})
          this.router.navigate(["home"]);
          
        },
        error:(err)=>{
          alert(err?.error.message);
          console.log("error cancel booking")
        }
      });
    } else
    {
      alert('Deletetion Cancelled!');
    }
  
}


}

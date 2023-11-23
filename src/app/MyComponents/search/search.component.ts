import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  public backgroundColor = 'DodgerBlue';
  public backgroundData = 'white';


  startDate: string = "";
  ArrivalLocation: string = "";
  DestinationLocation: string = "";
  currentDate: string = new Date().toISOString().slice(0, 10);
  resultArray!:any[];
  

  constructor(private auth:AuthService, private router:Router){}

  onSubmit() {

    if (this.startDate.trim() == "" || this.ArrivalLocation.trim() == "" || this.DestinationLocation.trim() == "") {
      alert("Please enter all the Details!");
      
    }
    else {
      console.log(this.startDate + " " + this.ArrivalLocation + " " + this.DestinationLocation);
      this.auth.search({
        startDate: this.startDate,
        ArrivalLocation: this.ArrivalLocation,
        DestinationLocation: this.DestinationLocation
      }).subscribe({
        //subscribe to the observable 
        next:(res)=>{
          this.resultArray=res;
        },
        error:(err)=>{
          this.resultArray=[];
          alert(err?.error.message);
         
        }
      });
    }
  }
  bookBtn(TId:number){
  
    this.router.navigate(['booking'], {queryParams:{id:TId}});
  }
}

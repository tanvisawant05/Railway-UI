import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { AuthService } from 'src/app/Services/auth.service';
import { UserdataService } from 'src/app/Services/userdata.service';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { NgToastService } from 'ng-angular-popup';
import { UsersService } from 'src/app/users.service';

@Component({
  selector: 'app-train-detail',
  templateUrl: './train-detail.component.html',
  styleUrls: ['./train-detail.component.css']
})
export class TrainDetailComponent {

  public backgroundColor = 'DodgerBlue';
  public backgroundData = 'white';
  // @ViewChild(MatPaginator) paginator !:MatPaginator;
  dataSource:any;
  displayedColumns: string[] = ['Train Name', 'Arrival Location', 'Destination Location', 'Start Date', 'Journey Time', 'SeatCount AC1tire', 'SeatCount AC2tire', 'SeatCount AC3tire', 'SeatCount Slepper', 'SeatCount SecoundSetting'];
  @ViewChild('paginator') paginator !:MatPaginator;

 title='pagination';
 POSTS:any;
 page: number = 1;
 count: number = 0;
 tableSize: number = 10;
 tableSizes: any = [3, 5, 8];
  
  journeyIdN!:number;

  trainNo!:string;
  trainName!: string;
  arrivalLocation!: string;
  destinationLocation!: string;
  startDate!: Date;
  journeyTime!: number;
  seatCount_AC1tire!: number;
  seatCount_AC2tire!: number;
  seatCount_AC3tire!: number;
  seatCount_Slepper!: number;
  seatCount_SecoundSetting!: number;

  trainData:any;

  currentDate:string = new Date().toISOString().slice(0,16);

  searchText = '';

  resultArray!:any;

 
  
  constructor(private auth: AuthService, private userData:UserdataService, private toast :NgToastService, private userService: UsersService){}

 postList():void{
 this.userService.getAllPosts().subscribe((response)=>{
  this.POSTS = response;
  console.log(this.POSTS);
 })
 }

 onTableDataChange(event:any){
  this.page=event;
  this.postList();
 }

 onTableSizeChange(event:any):void{
  this.tableSize=event.target.value;
  this.page=1;
  this.postList();
 }

  GetAllTrains(){
    this.auth.GetAllTrains().subscribe({
      //subscribes to the observable returned by the service and handles the response in the next and error callbacks.
      next:(res)=>{
        this.resultArray=res;
        
      },
      error:(err)=>{alert(err?.error.message);
        
      }
    });
  }

  // searchText(){
 
  // }

  ngOnInit(){
    
   
    this.GetAllTrains();
    this.postList();
    //this.dataSource.paginator = this.paginator;
    
  }

  


  deleteTrain(id:number){
   
      if (confirm("Do you want to delete")) {
        this.auth.deleteTrain(id).subscribe({
          next:(res)=>{
            // subscribes to the observable returned by the service and handles the response in the next and error callbacks. 
            //alert('Deleted successfully!')
            this.toast.success({detail:"SUCCESS", summary:"Train Deleted Successfully!",duration:5000})
            this.GetAllTrains();
          },
          error:(err)=>{
            alert(err?.error.message);
            
          }
        });
      } else
      {
        alert('Deletetion Cancelled!');
      }
    
  }


  addTrain(){
    alert("Called");
    if(
      this.trainName==null ||
      this.arrivalLocation == null ||
      this.destinationLocation == null ||
      this.startDate == null ||
      this.journeyTime == null ||
      this.seatCount_AC1tire == null ||
      this.seatCount_AC2tire == null ||
      this.seatCount_AC3tire == null ||
      this.seatCount_Slepper == null ||
      this.seatCount_SecoundSetting == null ||
      this.trainNo=="" ||
      this.arrivalLocation=="" ||
      this.destinationLocation==""){
        //alert("Error!");
        alert("Plz enter all the details");
      }
      else{
        this.auth.addTrain({
        
          trainName:this.trainName,
          arrivalLocation:this.arrivalLocation,
          destinationLocation:this.destinationLocation,
          startDate:this.startDate,
          journeyTime:this.journeyTime,
          seatCount_AC1tire:this.seatCount_AC1tire,
          seatCount_AC2tire:this.seatCount_AC2tire,
          seatCount_AC3tire:this.seatCount_AC3tire,
          seatCount_Slepper:this.seatCount_Slepper,
          seatCount_SecoundSetting:this.seatCount_SecoundSetting


        }).subscribe({
          next:(res)=>{
            //alert("Train added Successfully!");
            //this.toast.success({detail:"SUCCESS", summary:"Train added Successfully!",duration:5000})
            document.getElementById("addTrainModalClose")?.click();

            
            this.trainName == "";
            this.arrivalLocation = "";
            this.destinationLocation = "";
            this.startDate = new Date();
            this.journeyTime = 0;
            this.seatCount_AC1tire = 0;
            this.seatCount_AC2tire = 0;
            this.seatCount_AC3tire = 0;
            this.seatCount_Slepper = 0;
            this.seatCount_SecoundSetting = 0;
            this.GetAllTrains();
            this.toast.success({detail:"SUCCESS", summary:"Train added Successfully!",duration:5000})
          },
          error:(err)=>{
            Swal.fire({
              title: 'Error!',
              text: err?.error.message,
              icon: 'error',
              confirmButtonText: 'Ok'
            });
          }
        });
      }
 }
 editTrainClicked(id:number){
  this.auth.getTrainById(id).subscribe({
    next:(res)=>{
      //alert('called')
      this.trainData=res;
      this.journeyIdN=this.trainData.journeyId;
      this.trainNo = this.trainData.trainNo;
      this.trainName=this.trainData.trainName;
      this.arrivalLocation =this.trainData.arrivalLocation;
      this.destinationLocation =this.trainData.destinationLocation;
      this.startDate =this.trainData.startDate;
      this.journeyTime =this.trainData.journeyTime;
      this.seatCount_AC1tire =this.trainData.seatCount_AC1tire;
      this.seatCount_AC2tire =this.trainData.seatCount_AC2tire;
      this.seatCount_AC3tire =this.trainData.seatCount_AC3tire;
      this.seatCount_Slepper =this.trainData.seatCount_Slepper;
      this.seatCount_SecoundSetting =this.trainData.seatCount_SecoundSetting;
    },
    error:(err)=>{
      Swal.fire({
        title: 'Error!',
        text: err?.error.message,
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    }
  });
}
 editTrain(){
  if(this.trainNo == null ||
    this.trainName==null ||
    this.arrivalLocation == null ||
    this.destinationLocation == null ||
    this.startDate == null ||
    this.journeyTime == null ||
    this.seatCount_AC1tire == null ||
    this.seatCount_AC2tire == null ||
    this.seatCount_AC3tire == null ||
    this.seatCount_AC3tire == null ||
    this.seatCount_SecoundSetting == null ||
    this.seatCount_Slepper  == null ||
    this.trainNo=="" ||
    this.arrivalLocation=="" ||
    this.destinationLocation==""){
      alert("Error!");
    }
    else{
      this.auth.updateTrain({
        journeyId:this.journeyIdN,
        trainNo:this.trainNo,
        trainName:this.trainName,
        arrivalLocation:this.arrivalLocation,
        destinationLocation:this.destinationLocation,
        startDate:this.startDate,
        journeyTime:this.journeyTime,
        seatCount_AC1tire:this.seatCount_AC1tire,
        seatCount_AC2tire:this.seatCount_AC2tire,
        seatCount_AC3tire:this.seatCount_AC3tire,
        seatCount_Slepper:this.seatCount_Slepper,
        seatCount_SecoundSetting:this.seatCount_SecoundSetting
      }).subscribe({
        next:(res)=>{
          //alert("Edited Successfully!");
          this.toast.success({detail:"SUCCESS", summary:"Train Details Edited Successfully!",duration:5000})
          document.getElementById("updateTrainModalClose")?.click();
          this.trainNo = "";
          this.trainName == null;
          this.arrivalLocation = "";
          this.destinationLocation = "";
          this.startDate = new Date();
          this.journeyTime = 0;
          this.seatCount_AC1tire = 0;
          this.seatCount_AC2tire = 0;
          this.seatCount_AC3tire = 0;
          this.seatCount_Slepper = 0;
          this.seatCount_SecoundSetting = 0;
          this.GetAllTrains();
        },
        error:(err)=>{
          Swal.fire({
            title: 'Error!',
            text: err?.error.message,
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        }
      });
    }
}
}





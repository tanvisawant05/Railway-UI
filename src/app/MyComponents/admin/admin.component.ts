import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-adminhome',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  name: string = "";
  email: string = "";
  password: string = "";
  cPassword: string = "";

  constructor(private auth:AuthService, private router:Router){}

  onSubmit() {
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let passwordFormat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    if (this.name.trim() == "" || this.email.trim() == "" || this.password.trim() == "" || this.cPassword.trim() == "") {
      
      Swal.fire({
        title: 'Error!',
        text: "Please Enter All The Details!",
        confirmButtonText: 'Ok'
      });
      this.password="";
      this.cPassword="";
    }
    else if (!this.email.trim().match(mailformat)) {
       alert("Please Enter a Valid Email ID!");
      
      this.password="";
      this.cPassword="";
    }
    else if (this.password.trim() != this.cPassword.trim()) {
       alert("Password And Confirm Password Doesn't Match!");
      
      this.password="";
      this.cPassword="";
    }
    else if(!this.password.trim().match(passwordFormat)){
       alert("Password Format:\nAt least one lowercase letter\nAt least one uppercase letter\nAt least one digit\nAt least one special character from the set @$!%*?&\nMinimum length of 8 characters");
      
    }
    else {
      console.log(this.name + " " + this.email + " " + this.password + " " + this.cPassword);
      this.auth.addTrain({
        username: this.name.trim(),
        email: this.email.trim(),
        password: this.password.trim()
      }).subscribe({
        next:(res)=>{
          this.name="";
          this.email="";//''
          this.password="";
          this.cPassword="";
          alert(res.message);
          
        },
        error:(err)=>{
         
          Swal.fire({
            title: 'Error!',
            text: err?.error.message,
            icon: 'error',
            confirmButtonText: 'Ok'
          });
          this.password="";
          this.cPassword="";
        }
      });
    }
  }
}

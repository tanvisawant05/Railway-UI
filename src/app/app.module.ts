import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './MyComponents/navbar/navbar.component';
import { HomeComponent } from './MyComponents/home/home.component';
import { BookingComponent } from './MyComponents/booking/booking.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SigninComponent } from './MyComponents/signin/signin.component';
import { SignupComponent } from './MyComponents/signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { SearchComponent } from './MyComponents/search/search.component';
import { AdminComponent } from './MyComponents/admin/admin.component';
import { TrainDetailComponent } from './MyComponents/train-detail/train-detail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { BookingDialogComponent } from './booking-dialog/booking-dialog.component';
import { CancelBookingComponent } from './cancel-booking/cancel-booking.component';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { SearchPipe } from './search.pipe';
import { NgToastModule } from 'ng-angular-popup';
import { NgxPaginationModule } from 'ngx-pagination';
//import { ToastrModule } from 'ngx-toastr';

// import { Ng2SearchPipeModule } from 'ng2-search-filter';
// import { Ng2OrderModule } from 'ng2-order-pipe';
// import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    BookingComponent,
    SigninComponent,
    SignupComponent,
    SearchComponent,
    AdminComponent,
    TrainDetailComponent,
    BookingDialogComponent,
    CancelBookingComponent,
    SearchPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    NgToastModule,
    NgxPaginationModule
    //ToastrModule.forRoot()
    //Ng2SearchPipeModule,
    // Ng2OrderModule,
    // NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

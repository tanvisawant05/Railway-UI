import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingComponent } from './MyComponents/booking/booking.component';
import { HomeComponent } from './MyComponents/home/home.component';
import { SearchComponent } from './MyComponents/search/search.component';
import { SigninComponent } from './MyComponents/signin/signin.component';
import { SignupComponent } from './MyComponents/signup/signup.component';
import { AdminComponent } from './MyComponents/admin/admin.component';
import { TrainDetailComponent } from './MyComponents/train-detail/train-detail.component';
import { AuthGuard1 } from './Guards/auth.guard';
import { AuthGuard2 } from './Guards/signedin.guard';
import { AuthGuardAdmin } from './Guards/admin.guard';
import { AuthGuardTrain } from './Guards/train.guard';
import { CancelBookingComponent } from './cancel-booking/cancel-booking.component';


  const routes: Routes = [
    { path: '', redirectTo:'home', pathMatch:'full' },
    { path: 'home', component: HomeComponent },
    { path: 'signup', component: SignupComponent, canActivate:[AuthGuard2]},
    { path: 'signin', component: SigninComponent, canActivate:[AuthGuard2] },
    { path: 'search', component: SearchComponent },
    { path: 'booking', component: BookingComponent, canActivate:[AuthGuard1] },
    { path: 'admin', component: AdminComponent, canActivate:[AuthGuardAdmin] },
    { path: 'train-detail', component: TrainDetailComponent, canActivate:[AuthGuardTrain] },
    { path: 'cancel-booking', component: CancelBookingComponent}

    // { path: 'signup', component: SignupComponent},
    // { path: 'signin', component: SigninComponent,  },
    // { path: 'search', component: SearchComponent },
    // { path: 'booking', component: BookingComponent },
    // { path: 'admin', component: AdminComponent },
    // { path: 'train-detail', component: TrainDetailComponent }
  ];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

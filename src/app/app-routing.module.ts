import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from './edit/edit.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ViewComponent } from './view/view.component';
import { AuthGuardService } from 'services/auth-guard.service';
import { AuthService } from 'services/auth.service';
import { RoleGuardService } from 'services/role-guard.service';
import { ErrorComponent } from './error/error.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LeaveApplicationComponent } from './leave-application/leave-application.component';

const routes: Routes = [
  { path:'', component: LoginComponent },
  { path:'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'view', component: ViewComponent, canActivate: [AuthGuardService] },
  { path: 'edit', component: EditComponent, canActivate: [AuthGuardService, RoleGuardService] },
  { path: 'error', component: ErrorComponent},
  { path: 'dashboard', component: DashboardComponent },
  { path: 'leave-application', component: LeaveApplicationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    AuthGuardService,
    RoleGuardService,
    AuthService
  ]
})
export class AppRoutingModule { }

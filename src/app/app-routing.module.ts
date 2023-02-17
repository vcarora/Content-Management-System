import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditComponent } from './edit/edit.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RegisterComponent } from './register/register.component';
import { AdminAuthGuard } from './services/admin-auth.guard';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {path:"",component:HomeComponent },
  {path : "login",component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "dashboard", component: DashboardComponent,canActivate:[AuthGuard]},
  {path: "home",component: HomeComponent},
  {path: "edit/:id",component:EditComponent},
  {path: "admin",component: AdminComponent, canActivate:[AdminAuthGuard]},
  {path : "**",component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

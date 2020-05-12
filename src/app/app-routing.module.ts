import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import {AdminComponent} from './admin/admin.component';
import { AuthGuard } from './auth.guard';
import {CreateNotificationComponent} from './create-notification/create-notification.component';
import { ViewNotificationComponent } from './view-notification/view-notification.component';


const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'admin',component:AdminComponent,canActivate:[AuthGuard]},
  {path: 'createnotification', component: CreateNotificationComponent,canActivate:[AuthGuard]},
  {path:'view-notification', component:ViewNotificationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

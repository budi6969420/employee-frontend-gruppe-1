import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {NavbarComponent} from "./components/navbar/navbar.component";
import {LoginViewComponent} from "./views/login-view/login-view.component";
import {EmployeeListComponent} from "./employee-list/employee-list.component";
import {AuthGuard} from "./guards/auth.guard";

export const routes: Routes = [
  { path: '', redirectTo: '/employees', pathMatch: 'full' },
  { path: 'login', component: LoginViewComponent },
  {
    path: 'employees',
    component: EmployeeListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'qualifications',
    component: NavbarComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'settings',
    component: NavbarComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}

import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {NavbarComponent} from "./components/navbar/navbar.component";
import {LoginViewComponent} from "./views/login-view/login-view.component";
import {AuthGuard} from "./guards/auth.guard";
import {SettingsViewComponent} from "./views/settings-view/settings-view.component";
import {EmployeeViewComponent} from "./views/employee-view/employee-view.component";

export const routes: Routes = [
  { path: '', redirectTo: '/employees', pathMatch: 'full' },
  { path: 'login', component: LoginViewComponent },
  {
    path: 'employees',
    component: EmployeeViewComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'employee/create',
    component: NavbarComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'employee/edit/:id',
    component: NavbarComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'qualifications',
    component: NavbarComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'settings',
    component: SettingsViewComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}

/*
ngOnInit(): void {
    this.employeeId = this.route.snapshot.paramMap.get('id');
    console.log(this.employeeId); // Use this to fetch the employee details
}
 */

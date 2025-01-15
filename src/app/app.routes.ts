import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {NavbarComponent} from "./components/navbar/navbar.component";

export const routes: Routes = [
  {path: '', redirectTo: '/employees', pathMatch: 'full'},
  {path: 'employees', component: NavbarComponent}, // ersetzen durch view
  {path: 'qualifications', component: NavbarComponent}, // ersetzen durch view
  {path: 'settings', component: NavbarComponent}, // ersetzen durch view
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}

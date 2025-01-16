import {Component, OnInit} from '@angular/core';
import {TokenService} from "../../services/token.service";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-login-view',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './login-view.component.html',
  styleUrl: './login-view.component.css'
})
export class LoginViewComponent implements OnInit {

  protected username: string = 'user';
  protected password: string = 'test';

  protected tokenService: TokenService;
  private route: Router;
  constructor(tokenService: TokenService, route: Router) {
    this.tokenService = tokenService;
    this.route = route;
  }

  ngOnInit(): void {
        if (this.tokenService.isTokenValid()) this.navigateToHomeView();
    }

  login(): void {
    this.tokenService.login(this.username, this.password).subscribe({
      complete: () => {
        this.navigateToHomeView();
      },
    });
  }

  private navigateToHomeView() {
    this.route.navigate(['/']);
  }
}

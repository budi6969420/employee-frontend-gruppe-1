import { Component, OnInit } from '@angular/core';
import { TokenService } from "../../services/token.service";
import { Router } from "@angular/router";
import { FormsModule } from "@angular/forms";
import {NgClass, NgIf} from "@angular/common";

@Component({
  selector: 'app-login-view',
  standalone: true,
  imports: [
    FormsModule,
    NgClass,
    NgIf
  ],
  templateUrl: './login-view.component.html',
  styleUrl: './login-view.component.css'
})
export class LoginViewComponent implements OnInit {

  protected username: string = 'user';
  protected password: string = 'test';
  protected passwordVisible: boolean = false;

  protected tokenService: TokenService;
  private route: Router;

  constructor(tokenService: TokenService, route: Router) {
    this.tokenService = tokenService;
    this.route = route;
  }

  ngOnInit(): void {
    if (this.tokenService.isTokenValid()) {
      this.navigateToHomeView();
    }
  }

  login(): void {
    this.tokenService.login(this.username, this.password).subscribe({
      complete: () => {
        this.navigateToHomeView();
      },
      error: (err) => {
        console.error('Login failed', err);
      }
    });
  }

  private navigateToHomeView() {
    this.route.navigate(['/']);
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }
}

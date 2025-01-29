import {Component} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {TokenService} from "../../services/token.service";

@Component({
  selector: 'app-navbar',
  standalone: true,
    imports: [
        RouterLink,
        RouterLinkActive
    ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private tokenService: TokenService, private router: Router) {
  }
  logout(): void {
    this.tokenService.removeTokenFromMemory();
    this.router.navigate(['/login']);
  }
}

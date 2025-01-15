import { Component } from '@angular/core';
import {TokenService} from "../../services/token.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-settings-view',
  standalone: true,
  imports: [],
  templateUrl: './settings-view.component.html',
  styleUrl: './settings-view.component.css'
})
export class SettingsViewComponent {

  constructor(private tokenService: TokenService, private router: Router) {
  }
  logout(): void {
    this.tokenService.removeTokenFromMemory();
    this.router.navigate(['/login']);
  }
}

import { Component } from '@angular/core';
import {ErrorService} from "../../services/error.service";

@Component({
  selector: 'app-error-banner',
  standalone: true,
  imports: [],
  templateUrl: './error-banner.component.html',
  styleUrl: './error-banner.component.css'
})
export class ErrorBannerComponent {

  constructor(protected errorService: ErrorService) {
  }
}

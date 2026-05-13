import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { useAuth } from '../app/authConfig'; // ' ../authConfig';
import { AuthenticationResult } from '@azure/msal-browser';

import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { authConfig } from './authConfig';

@Component({
  selector: 'app-root',

  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],

  // External template file for the layout (navbar + footer + router-outlet)
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  readonly authConfig = useAuth();
  logout() {
    this.authConfig.msalInstance.logoutRedirect({
      postLogoutRedirectUri: window.location.origin,
    });
  }
}

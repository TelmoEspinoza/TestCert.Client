import { Component, OnInit } from '@angular/core';
import { TestService } from '../services/test-service';
import { useAuth } from '../authConfig';
import { AuthenticationResult } from '@azure/msal-browser';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [FormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage implements OnInit {
  constructor(
    private service: TestService,
    private router: Router,
  ) {}
  readonly authConfig = useAuth();

  async ngOnInit() {
    console.log('ngOnInit');
    await this.authConfig.msalInstance.initialize();
    this.authConfig.msalInstance
      .handleRedirectPromise()
      .then(async (authResult: AuthenticationResult | null) => {
        const accounts = this.authConfig.msalInstance.getAllAccounts();
        if (accounts.length > 0) {
          this.authConfig.account = accounts[0];
          const response = this.authConfig.msalInstance.acquireTokenSilent({
            account: this.authConfig.account,
            scopes: ['api://fd9af8b5-c80d-4180-a26e-713a53525404/TestCertAPI.Read'],
          });
          this.authConfig.token = (await response).accessToken;
          console.log('Token');
          //this.router.navigateByUrl('/home');
        }
      });
  }

  async login() {
    console.log('login()');
    await this.authConfig.msalInstance.loginRedirect();
    /*
     if (this.msalGuardConfig.authRequest) {
      this.authService.loginRedirect({
        ...this.msalGuardConfig.authRequest,
      } as RedirectRequest);
    } else {
      this.authService.loginRedirect();
    }
*/
  }

  logout() {
    this.authConfig.msalInstance.logoutRedirect({
      postLogoutRedirectUri: window.location.origin,
    });
  }

  getTests() {
    this.service.getTests().subscribe({
      next: (res: any) => {
        console.log('data', res);
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
}

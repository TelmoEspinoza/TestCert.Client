import { Routes } from '@angular/router';
import { Test } from './pages/test/test';
import { Equipment } from './pages/equipment/equipment';
import { LoginPage } from './login-page/login-page';
import { Home } from './home/home';

export const routes: Routes = [
  { path:'home',  component: Home},
  { path: 'login', component: LoginPage },
  { path: '', component: LoginPage },
  //{ path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'test', component: Test },
  { path: 'equipment', component: Equipment },
  //{ path: '**', redirectTo: '' }
];

import { Routes } from '@angular/router';
import { Test } from './pages/test/test';
import { Equipment } from './pages/equipment/equipment';

export const routes: Routes = [
  { path: '', redirectTo: '/test', pathMatch: 'full' },
  { path: 'test', component: Test },
  { path: 'equipment', component: Equipment },
];

import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';
import { authenticateGuard } from './guards/authenticate.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { RenderMode, ServerRoute } from '@angular/ssr';

export const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'register', component: HomeComponent },
  { path: 'main', component: MainComponent, canActivate: [authenticateGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'profile/:username', component: ProfileComponent, canActivate: [authenticateGuard] }
];

import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'register', component: HomeComponent },
  { path: 'main', component: MainComponent },
  { path: 'login', component: LoginComponent }
];

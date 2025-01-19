import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { MainComponent } from './components/main/main.component';

export const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'register', component: HomeComponent },
  { path: 'main', component: MainComponent }
];

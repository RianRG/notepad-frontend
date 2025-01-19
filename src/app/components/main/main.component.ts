import { Component } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  imports: [],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  constructor(private http: HttpService, private router: Router){};



  ngOnInit(): void{
    this.http.getSession().subscribe({
      next: msg => console.log(msg),
      error: err => this.router.navigateByUrl('register')
    })
  }
}

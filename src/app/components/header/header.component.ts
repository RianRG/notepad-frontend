import { Component } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  studentInfos!: any;
  constructor(private http: HttpService){};

  ngOnInit(): void{
    this.http.getSession().subscribe((msg: any) =>{
      console.log(msg);
      this.studentInfos = msg.student;
    })       
  }
}

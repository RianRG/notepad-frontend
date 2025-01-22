import { Component } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  studentInfos: any = [];
  friends: any = []
  friendsMenuClass: boolean = false;
  constructor(private http: HttpService){};

  ngOnInit(): void{
    this.http.getSession().subscribe((msg: any) =>{
      this.studentInfos = msg.student;
    })     
    
    this.http.getFriends().subscribe((msg: any) =>{
      this.friends = msg.friends
    })
  }

  toggleFriends(){
    this.friendsMenuClass = !this.friendsMenuClass
  }
}

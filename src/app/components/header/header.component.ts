import { Component, ViewChild } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { ConfirmPopupComponent } from '../confirm-popup/confirm-popup.component';

@Component({
  selector: 'app-header',
  imports: [ConfirmPopupComponent],
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

  
  blockFriend(){
    const friendUsername = this.currentFriendUsername
    this.http.blockFriend(friendUsername).subscribe((msg: any) =>{
      const friendIndex = this.friends.findIndex((friend: any) =>{
        return friend.username === friendUsername
      })
      this.friends.splice(friendIndex, 1)
    })
  }
  currentFriendUsername: string = '';
  @ViewChild(ConfirmPopupComponent) confirmPopupComponent!: ConfirmPopupComponent;
  togglePopup(friendUsername: string){
    this.confirmPopupComponent.togglePopup()
    this.currentFriendUsername = friendUsername;
  }
}

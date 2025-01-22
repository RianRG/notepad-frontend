import { Component, ViewChild } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { ConfirmPopupComponent } from '../confirm-popup/confirm-popup.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  imports: [ConfirmPopupComponent, ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  searchFriendsForm!: FormGroup;
  studentInfos: any = [];
  friends: any = []
  filteredFriends: string[] = []
  friendsMenuClass: boolean = false;
  addFriendsMenuClass: boolean = false;
  constructor(private http: HttpService, private fb: FormBuilder){
    this.searchFriendsForm = this.fb.group({
      friendName: ['']
    })
  };

  ngOnInit(): void{
    this.http.getSession().subscribe((msg: any) =>{
      this.studentInfos = msg.student;
    })     
    
    this.http.getFriends().subscribe((msg: any) =>{
      this.friends = msg.friends
      this.friends.forEach((friend: any) =>{
        this.filteredFriends.push(friend.username)
      })
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
      this.filteredFriends.splice(friendIndex, 1);
    })
  }
  currentFriendUsername: string = '';
  @ViewChild(ConfirmPopupComponent) confirmPopupComponent!: ConfirmPopupComponent;
  togglePopup(friendUsername: string){
    this.confirmPopupComponent.togglePopup()
    this.currentFriendUsername = friendUsername;
  }

  toggleAddFriendsMenu(){
    this.addFriendsMenuClass = !this.addFriendsMenuClass
  }
  
  filterFriends(){
    if(this.searchFriendsForm.value.friendName!==''){
      this.filteredFriends = this.filteredFriends.filter(f =>{
        return f.startsWith(this.searchFriendsForm.value.friendName)
      })
    } else{
      this.filteredFriends = this.friends.reduce((acm: string[], k: any) =>{
        acm.push(k.username)
        return acm;
      }, [])
    }
    
  }

  onSubmit(){
    
  }
  sendersUsername: string[] = [];
  friendRequestsMenuClass: boolean = false;
  toggleFriendRequestsMenu(){
    this.friendRequestsMenuClass = !this.friendRequestsMenuClass
    this.http.getFriendRequests().subscribe((msg: any) =>{
      this.sendersUsername = msg.friendRequests.reduce((acm: string[], k: any) =>{
        console.log(k.sender)
        acm.push(k.sender.username);
        return acm;
      }, [])
    })
  }
}

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

  sendersUsername: string[] = [];
  friendRequestsMenuClass: boolean = false;
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

    this.http.getFriendRequests().subscribe((msg: any) =>{
      this.sendersUsername = msg.friendRequests.reduce((acm: string[], k: any) =>{
        acm.push(k.sender.username);
        return acm;
      }, [])
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
    if(this.friendRequestsMenuClass) this.friendRequestsMenuClass = !this.friendRequestsMenuClass
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
  
  toggleFriendRequestsMenu(){
    this.friendRequestsMenuClass = !this.friendRequestsMenuClass
    if(this.addFriendsMenuClass) this.addFriendsMenuClass = !this.addFriendsMenuClass

  }

  acceptFriendRequest(friendName: string){
    this.http.addFriend(friendName).subscribe((msg: any) =>{
      const senderIndex = this.sendersUsername.findIndex(sender =>{
        return sender === friendName
      })
      this.sendersUsername.splice(senderIndex, 1)
      this.friends.push({
        id: Math.random()*200,
        username: friendName
      })
      this.filteredFriends.push(friendName)
    })
  }
}

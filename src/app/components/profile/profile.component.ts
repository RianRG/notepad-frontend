import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { GetProfileDTO } from '../../types/responseDTO';
import { DatePipe } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { NotificationComponent } from '../notification/notification.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ConfirmPopupComponent } from '../confirm-popup/confirm-popup.component';

@Component({
  selector: 'app-profile',
  imports: [DatePipe, HeaderComponent, NotificationComponent, ReactiveFormsModule, ConfirmPopupComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  currentNoteId!: string
  currentFriendName!: string
  formClass: boolean = false;
  noteForm!: FormGroup;
  studentInfos: GetProfileDTO = {
    username: '',
    createdAt: '',
    email: '',
    friends: 0,
    id: '',
    notes: [],
    password: '',
    sessionId: ''
  }
  errorMessage: string = '';
  constructor(private route: ActivatedRoute, private http: HttpService, private fb: FormBuilder){
    this.noteForm = this.fb.group({
          title: [''],
          content: [''],
          isPrivate: [false],
        })
  };

  ngOnInit(): void{
    this.currentFriendName = this.route.snapshot.paramMap.get('username')!;
    this.route.params.subscribe((params: any) =>{
      this.http.getStudentProfile(this.route.snapshot.paramMap.get('username')!).subscribe({
      
        next: (msg: any) => this.studentInfos = msg.student,
        error: ({error}) => {
          if(error.message=== 'Student not found!')
            this.errorMessage = error.message
        }
      })
    })
  }

  @ViewChild(NotificationComponent) notificationComponent!: NotificationComponent;
  addFriend(username: string){
    this.http.addFriend(username).subscribe({
      next: ({ msg }: any) => {
        this.notificationComponent.showNotification(msg)
      },
      error: ({ error }) =>{
        this.notificationComponent.showNotification(error.message)
      }
    })
  }
  @ViewChild(HeaderComponent) headerComponent!: HeaderComponent
  blockFriend(){
    this.http.blockFriend(this.currentFriendName).subscribe({
      next: ({ msg }: any) => {
        this.notificationComponent.showNotification(msg)
      },
      error: ({ error }) =>{
        this.notificationComponent.showNotification(error.message)
      }
    })

    this.headerComponent.removeFriendOfArray(this.currentFriendName);
  }
  
  unfriend(username: string){
    this.http.unfriend(username).subscribe({
      next: ({ msg }: any) => {
        this.notificationComponent.showNotification(msg)
      },
      error: ({ error }) =>{
        this.notificationComponent.showNotification(error.message)
      }
    })
    this.headerComponent.removeFriendOfArray(username);
  }
  
  editNote(event: any){
    this.formClass = !this.formClass
    this.noteForm.disable()
    const note = {
      title: event.target.childNodes[0].innerText,
      content: event.target.childNodes[1].innerText,
      isPrivate: event.target.childNodes[3].innerText,
      noteId: event.target.childNodes[4].innerText
    }
    
    this.noteForm.get('title')?.setValue(note.title)
    this.noteForm.get('content')?.setValue(note.content)
    if(note.isPrivate === 'true') this.noteForm.get('isPrivate')?.setValue(true)
      this.currentNoteId = note.noteId;
    
  }
  
  toggleForm(){
    this.formClass = !this.formClass
  }
  
  onSubmit(){
    
  }
  togglePopup(){
    console.log('not implemented yet')
  }
  
  @ViewChild(ConfirmPopupComponent) confirmPopupComponent!: ConfirmPopupComponent;
  toggleConfirmPopup(){
    this.confirmPopupComponent.togglePopup()
  }
}

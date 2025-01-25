import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { GetProfileDTO } from '../../types/responseDTO';
import { DatePipe } from '@angular/common';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-profile',
  imports: [DatePipe, HeaderComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  studentInfos!: GetProfileDTO
  errorMessage: string = '';
  constructor(private route: ActivatedRoute, private http: HttpService){};

  ngOnInit(): void{
    this.http.getStudentProfile(this.route.snapshot.paramMap.get('username')!).subscribe({
      next: (msg: any) => this.studentInfos = msg.student,
      error: ({error}) => {
        if(error.message=== 'Student not found!')
          this.errorMessage = error.message
      }
    })
  }

  @ViewChild(HeaderComponent) headerComponent!: HeaderComponent;
  addFriend(username: string){
    console.log(username)
  }
}

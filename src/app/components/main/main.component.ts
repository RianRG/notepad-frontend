import { Component } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-main',
  imports: [ReactiveFormsModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  studentId!: string;
  noteForm!: FormGroup
  notes: any = [];
  constructor(private http: HttpService, private router: Router, private fb: FormBuilder){
    this.noteForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      isPrivate: [false, Validators.required]
    })
  };
  
  
  
  ngOnInit(): void{
    this.http.getSession().subscribe((msg: any) =>{
      this.studentId = msg.student.id
    })

    this.http.getNotes().subscribe((msg: any) =>{
      console.log(msg);
      this.notes = msg;
    })
  }

  onSubmit(){
    this.http.registerNote(this.noteForm.value).subscribe(m =>{
      console.log(m)
    })
  }
}

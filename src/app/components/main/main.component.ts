import { Component, inject } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GetNoteDTO } from '../../types/responseDTO';
import { DatePipe } from '@angular/common';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-main',
  imports: [ReactiveFormsModule, DatePipe],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  loadingService = inject(LoadingService)

  studentId!: string;
  noteForm!: FormGroup
  formClass: boolean = false;
  notes: GetNoteDTO[] = [];
  currentNodeId!: string | null;
  constructor(private http: HttpService, private router: Router, private fb: FormBuilder){
    this.noteForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      isPrivate: [false, Validators.required],
    })
  };
  
  
  
  ngOnInit(): void{
    this.http.getSession().subscribe((msg: any) =>{
      this.studentId = msg.student.id
    })

    this.http.getNotes().subscribe((msg: any) =>{
      this.notes = msg;
    })
  }

  onSubmit(){
    this.loadingService.setLoading(true)
    if(this.currentNodeId){
      this.http.updateNode(this.currentNodeId, this.noteForm.value).subscribe((r: any) =>{
        this.notes = this.notes.map(note =>{
          if(note.id === this.currentNodeId){
            return {
              id: note.id,
              title: this.noteForm.value.title,
              content: this.noteForm.value.content,
              isPrivate: this.noteForm.value.isPrivate,
              createdAt: note.createdAt
            }
          } 
          return note;
        })
        this.currentNodeId = null;
      })
    } else{
      this.http.registerNote(this.noteForm.value).subscribe((r: any) =>{
        this.notes.push({
          id: r.notes.id,
          title: this.noteForm.value.title,
          content: this.noteForm.value.content,
          isPrivate: this.noteForm.value.isPrivate,
          createdAt: new Date(),
        })
      })
    } 
    this.formClass = !this.formClass
    setTimeout(() =>{
      this.loadingService.setLoading(false);
    }, 400)
  }

  toggleForm(){
    this.formClass = !this.formClass;
    this.noteForm.get('title')?.setValue('')
    this.noteForm.get('content')?.setValue('')
    this.noteForm.get('isPrivate')?.setValue(false)
  }

  editNote(event: any){
    this.formClass = !this.formClass
    const note = {
      title: event.target.childNodes[0].innerText,
      content: event.target.childNodes[1].innerText,
      isPrivate: event.target.childNodes[3].innerText,
      noteId: event.target.childNodes[4].innerText
    }

    this.noteForm.get('title')?.setValue(note.title)
    this.noteForm.get('content')?.setValue(note.content)
    if(note.isPrivate === 'true') this.noteForm.get('isPrivate')?.setValue(note.isPrivate)
    this.currentNodeId = note.noteId;
  }
}

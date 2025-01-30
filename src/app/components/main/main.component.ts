import { Component, inject, ViewChild } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GetNoteDTO } from '../../types/responseDTO';
import { DatePipe } from '@angular/common';
import { LoadingService } from '../../services/loading.service';
import { ConfirmPopupComponent } from '../confirm-popup/confirm-popup.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-main',
  imports: [ReactiveFormsModule, DatePipe, ConfirmPopupComponent, HeaderComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  loadingService = inject(LoadingService)

  studentInfos!: any;
  noteForm!: FormGroup
  formClass: boolean = false;
  notes: GetNoteDTO[] = [];
  currentNoteId!: string | null;

  constructor(private http: HttpService, private router: Router, private fb: FormBuilder){
    this.noteForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      isPrivate: [false, Validators.required],
    })
  };
  
  
  
  ngOnInit(): void{
    console.log(process.env['NODE_ENV']);
    this.http.getSession().subscribe((msg: any) =>{
      this.studentInfos = msg.student
    })

    this.http.getNotes().subscribe((msg: any) =>{
      this.notes = msg;
    })

  }

  onSubmit(){
    this.loadingService.setLoading(true)
    if(this.currentNoteId){
      this.http.updateNote(this.currentNoteId, this.noteForm.value).subscribe((r: any) =>{
        this.notes = this.notes.map(note =>{
          console.log(this.currentNoteId)
          if(note.id === this.currentNoteId){
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
        this.currentNoteId = null;
      })
    } else{
      this.http.registerNote(this.noteForm.value).subscribe((r: any) =>{
        this.notes.unshift({
          id: r.notes.id,
          title: this.noteForm.value.title,
          content: this.noteForm.value.content,
          isPrivate: this.noteForm.value.isPrivate,
          createdAt: new Date(),
        })
      })
      this.currentNoteId = null;
    } 
    this.formClass = !this.formClass
    setTimeout(() =>{
      this.loadingService.setLoading(false);
    }, 600)
  }

  toggleForm(){
    this.formClass = !this.formClass;
    this.noteForm.get('title')?.setValue('')
    this.noteForm.get('content')?.setValue('')
    this.noteForm.get('isPrivate')?.setValue(false)
    this.currentNoteId = null;
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
    if(note.isPrivate === 'true') this.noteForm.get('isPrivate')?.setValue(true)
    this.currentNoteId = note.noteId;
  }

  deleteNote(){
    this.loadingService.setLoading(true)

    // saving currentNoteId on a temporary variable because of context conflicts
    const currentNoteId = this.currentNoteId;

    this.http.deleteNote(this.currentNoteId!).subscribe((r: any) =>{
      const noteIndex = this.notes.findIndex((note) =>{
        return note.id === currentNoteId
      })
      this.notes.splice(noteIndex, 1);
    })
    this.formClass = !this.formClass
    this.currentNoteId = null;
    this.loadingService.setLoading(false)
  }
  @ViewChild(ConfirmPopupComponent) confirmPopupComponent!: ConfirmPopupComponent;
  togglePopup(){
    this.confirmPopupComponent.togglePopup()
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environment';
import { RegisterStudentDTO, LoginStudentDTO, RegisterNoteDTO } from '../types/requestDTO';
import { GetNoteDTO } from '../types/responseDTO';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) { }

  registerStudent({username, email, password}: RegisterStudentDTO){
    return this.http.post(`${environment.apiUrl}/students/register`, { username, email, password }, { withCredentials: true })
  }

  isAuthenticated(): Observable<boolean>{
    return new Observable<boolean>(obs =>{
      this.http.get(`${environment.apiUrl}/session`, { withCredentials: true }).subscribe({
        next: () =>{
          obs.next(true);
          obs.complete()
        },
        error: (err) =>{
          console.log(err)
          obs.next(false);
          obs.complete()
        }
      })
    })
  }

  getSession(){
    return this.http.get(`${environment.apiUrl}/session`, { withCredentials: true })
  }

  loginStudent({ email, password }: LoginStudentDTO){
    return this.http.post(`${environment.apiUrl}/login`, { email, password }, { withCredentials: true })
  }

  registerNote({ title, content, isPrivate }: RegisterNoteDTO){
    return this.http.post(`${environment.apiUrl}/notes/register`, { title, content, isPrivate }, { withCredentials: true })
  }

  getNotes(): Observable<GetNoteDTO[]>{
    return this.http.get<GetNoteDTO[]>(`${environment.apiUrl}/notes`, { withCredentials: true })
  }

  updateNote(noteId: string, { title, content, isPrivate }: RegisterNoteDTO): Observable<GetNoteDTO>{
    return this.http.put<GetNoteDTO>(`${environment.apiUrl}/notes/${noteId}`, { title, content, isPrivate }, { withCredentials: true })
  }

  deleteNote(noteId: string){
    return this.http.delete(`${environment.apiUrl}/notes/${noteId}`, { withCredentials: true })
  }

  getFriends(){
    return this.http.get(`${environment.apiUrl}/friends`, { withCredentials: true })
  }

  blockFriend(friendUsername: string){
    return this.http.delete(`${environment.apiUrl}/block/${friendUsername}`, { withCredentials: true })
  }

  getFriendRequests(){
    return this.http.get(`${environment.apiUrl}/friendRequests`, { withCredentials: true })
  }

  addFriend(friendName: string){
    return this.http.post(`${environment.apiUrl}/add/${friendName}`, {}, { withCredentials: true })
  }

  unfriend(friendName: string){
    return this.http.delete(`${environment.apiUrl}/unfriend/${friendName}`, { withCredentials: true })
  }

  getStudentProfile(username: string){
    return this.http.get(`${environment.apiUrl}/students/${username}`, { withCredentials: true })
  }
}

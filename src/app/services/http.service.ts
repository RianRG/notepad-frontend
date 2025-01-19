import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environment';

interface RegisterStudentDTO{
  username: string,
  email: string,
  password: string
}

interface LoginStudentDTO{
  email: string,
  password: string
}

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
        error: () =>{
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
}

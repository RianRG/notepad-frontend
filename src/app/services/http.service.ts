import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface RegisterStudentDTO{
  username: string,
  email: string,
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

   registerStudent({username, email, password}: RegisterStudentDTO){
    return this.http.post('http://localhost:5000/students/register', { username, email, password })
  }
}

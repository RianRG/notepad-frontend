import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  constructor(private http: HttpService) { }


  isAuthenticated(): Observable<boolean>{
    return new Observable<boolean>(obs =>{
      this.http.getSession().subscribe({
        next: () => { 
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
}

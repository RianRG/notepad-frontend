import { Component } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { error } from 'console';
@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  form!: FormGroup
  errorMsg!: String;
  errorClass: boolean = false;
  constructor(private http: HttpService, private fb: FormBuilder, private router: Router){
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.email],
      password: ['', Validators.minLength(6)]
    })
  }

  ngOnInit(): void{
  }

  onSubmit(){
    if(this.form.invalid){
      this.errorClass = true;
      if(!this.form.value.username) this.errorMsg = 'You need to choose a username';
      else if(!this.form.value.email.includes('@') || !this.form.value.email.includes('.')) this.errorMsg = 'Type a valid email';
      else if(this.form.value.password.length < 6) this.errorMsg = 'Password must contain at least 6 characters';
    } else{
      this.errorClass = false;
      
      this.http.registerStudent(this.form.value).subscribe({
        next: r => this.router.navigateByUrl('/main'),
        error: e=> {
          if(!this.errorClass){
            this.errorMsg = e.error.message
            this.errorClass = true;
          }
        }
      })                  
    }
    
  }
}

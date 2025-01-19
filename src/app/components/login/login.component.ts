import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form!: FormGroup
  errorMsg!: String;
  errorClass: boolean = false;
  constructor(private http: HttpService, private fb: FormBuilder, private router: Router){
    this.form = this.fb.group({
      email: ['', Validators.email],
      password: ['', Validators.minLength(6)]
    })
  }

  ngOnInit(): void{
  }

  onSubmit(){
    if(this.form.invalid){
      this.errorClass = true;
      if(!this.form.value.email.includes('@') || !this.form.value.email.includes('.')) this.errorMsg = 'Type a valid email';
      else if(this.form.value.password.length < 6) this.errorMsg = 'Password must contain at least 6 characters';
    } else{
      this.errorClass = false;
      
      this.http.loginStudent(this.form.value).subscribe({
        next: r => this.router.navigateByUrl('/main'),
        error: e=> {
          if(!this.errorClass){
            console.log(e.error)
            this.errorMsg = e.status === 500 ? e.error.message : e.statusText
            this.errorClass = true;
          }
        }
      })                  
    }
    
  }
}

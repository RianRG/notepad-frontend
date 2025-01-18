import { Component } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  form!: FormGroup
  constructor(private http: HttpService, private fb: FormBuilder){
    this.form = this.fb.group({
      username: '',
      email: '',
      password: ''
    })
  }

  ngOnInit(): void{
  }

  onSubmit(){
    this.http.registerStudent(this.form.value).subscribe(r =>{
      console.log(r)
    })
  }
}

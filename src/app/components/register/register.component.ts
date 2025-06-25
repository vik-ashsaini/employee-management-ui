import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit{
  form! :FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}

  ngOnInit(){
    this.form = this.fb.group({
      email: [''],
      password: ['']
    });
  }
  
  submit() {
    this.auth.register(this.form.value).subscribe({
      next: () => this.router.navigate(['/login']),
      // error: () => alert('Registration failed')
    });
  }
}
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeService } from '../../../services/employee.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee-form.component.html'
})
export class EmployeeFormComponent implements OnInit {
  constructor(
  private fb :FormBuilder,
  private service:EmployeeService,
  private route :ActivatedRoute,
  private router:Router){}

  form!: FormGroup;
  id!: number;

  ngOnInit() {

    this.form = this.fb.group({
      name: ['', Validators.required],
      position: ['', Validators.required],
      salary: [0, [Validators.required, Validators.min(1)]]
    });

    this.id = +this.route.snapshot.paramMap.get('id')!;
    if (this.id) {
      this.service.getById(this.id).subscribe(emp =>  
        this.form.patchValue({
        name: emp.name,
        position: emp.position,
        salary: emp.salary
      })
    )}
  }

  submit() {
    const formValue = this.form.value;
    const data = {
      id:formValue.id??0,
      name: formValue.name ?? '',
      position: formValue.position ?? '',
      salary: formValue.salary ?? 0
    };
    if (this.id) {

      this.service.update(this.id, data).subscribe(() => this.router.navigate(['/']));
    } else {
      this.service.create(data).subscribe(() => this.router.navigate(['/']));
    }
  }
}
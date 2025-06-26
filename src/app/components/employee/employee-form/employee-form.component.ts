import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeService } from '../../../services/employee.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { EmployeeModel } from '../../../models/employee.model';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatCardModule
  ],
  templateUrl: './employee-form.component.html'
})
export class EmployeeFormComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<EmployeeFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EmployeeModel,
    private fb: FormBuilder){
      this.form = this.fb.group({
      id: [data.id],
      name: [data.name, Validators.required],
      position: [data.position, Validators.required],
      salary: [data.salary, [Validators.required, Validators.min(0)]],
    });
    }

  form!: FormGroup;
  id!: number;

  ngOnInit() {
    // this.form = this.fb.group({
    //   name: ['', Validators.required],
    //   position: ['', Validators.required],
    //   salary: [0, [Validators.required, Validators.min(1)]]
    // });

    // this.id = +this.route.snapshot.paramMap.get('id')!;
    // if (this.id) {
    //   this.service.getById(this.id).subscribe(emp =>  
    //     this.form.patchValue({
    //     name: emp.name,
    //     position: emp.position,
    //     salary: emp.salary
    //   })
    // )}
  }

  submit() {
    // const formValue = this.form.value;
    // const data = {
    //   id:formValue.id??0,
    //   name: formValue.name ?? '',
    //   position: formValue.position ?? '',
    //   salary: formValue.salary ?? 0
    // };
    // if (this.id) {

    //   this.service.update(this.id, data).subscribe(() => this.router.navigate(['/']));
    // } else {
    //   this.service.create(data).subscribe(() => this.router.navigate(['/']));
    // }
     if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }
}
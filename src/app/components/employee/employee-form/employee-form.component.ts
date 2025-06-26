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
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})

export class EmployeeFormComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<EmployeeFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EmployeeModel,
    private fb: FormBuilder,
    private empService:EmployeeService
  ) 
  {
    
  }

  form!: FormGroup;
  id!: number;

  ngOnInit() {
    this.form = this.fb.group({
      id: [this.data.id],
      name: [this.data.name, Validators.required],
      position: [this.data.position, Validators.required],
      salary: [this.data.salary, [Validators.required, Validators.min(0)]],
    });

    // this.id = +this.route.snapshot.paramMap.get('id')!;
     if (this.data.id) {
      //this.service.getById(this.id).subscribe(emp =>  
        this.form.patchValue({
        name: this.data.name,
        position: this.data.position,
        salary: this.data.salary
      })
    //)
    }
  }

  submit() { 
    if (this.form.valid) {
      if (this.data.id === 0) 
      {
        //this.router.navigate(['/add']);
        this.empService.create(this.form.value).subscribe(res => {
          if(res)
          {
            console.log("Employee SuccessFully Added");
          }
          else
          {
            console.log("Error Occured While Saving Data");
          }
        });
      } 
      else 
      {
        //this.router.navigate(['/edit', result.id]);
        this.empService.update(this.data.id, this.form.value).subscribe(res => {
          if(res)
          {
            console.log("Employee Data SuccessFully updated");
          }
          else
          {
            console.log("Error Occured While Saving Data");
          }
        });
      }
      this.dialogRef.close(true);
    }
  }
}
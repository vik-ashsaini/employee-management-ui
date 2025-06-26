import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../services/employee.service';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeModel } from '../../models/employee.model';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { MatDialog } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule, MatPaginatorModule, MatSortModule,
    MatInputModule, MatFormFieldModule, MatButtonModule,
    MatIconModule, MatCardModule,MatToolbarModule
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {

  displayedColumns: string[] = ['name', 'position', 'salary', 'actions'];
  dataSource = new MatTableDataSource<EmployeeModel>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  employees: EmployeeModel[] = [];

  constructor(private dialog: MatDialog,
    private empService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.empService.getAll().subscribe(data =>{
       this.dataSource.data = data;
       this.employees = data
    });
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadEmployees() {
    
  }

  applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.dataSource.filter = value.trim().toLowerCase();
  }

  openDialog(employee?: EmployeeModel) {
    const dialogRef = this.dialog.open(EmployeeFormComponent, {
      width: '400px',
      data: employee ? { ...employee } : { id: 0, name: '', department: '', salary: 0 }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.id === 0) {
          this.router.navigate(['/add']);
          this.empService.create(result).subscribe(() => this.loadEmployees());
        } else {
          this.router.navigate(['/edit', result.id]);
          this.empService.update(result.id, result).subscribe(() => this.loadEmployees());
        }
      }
    });
  }

  deleteEmployee(id: number) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.empService.delete(id).subscribe(() => this.loadEmployees());
    }
  }

  duplicateEmployee(emp: EmployeeModel) {
    const data = {
      id:emp.id,
      name: emp.name,
      position: emp.position,
      salary: emp.salary
    };
    this.empService.create(emp).subscribe(() => {
     // this.empService.loadEmployees(); // refresh the list
    });
  }
}

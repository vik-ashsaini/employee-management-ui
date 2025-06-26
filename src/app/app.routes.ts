import { Routes } from '@angular/router';
import { EmployeeFormComponent } from './components/employee/employee-form/employee-form.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
 { path: 'login', component: LoginComponent }, // ✅ No guard
  { path: 'register', component: RegisterComponent }, // ✅ No guard
  { path: '', component: EmployeeComponent, canActivate: [AuthGuard] },
  { path: 'employee', redirectTo: '', pathMatch: 'full' }, // ✅ Handles '/employee'
  { path: 'add', component: EmployeeFormComponent, canActivate: [AuthGuard] },
  { path: 'edit/:id', component: EmployeeFormComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' } // ✅ fallback for unknown paths
];

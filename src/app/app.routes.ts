import { Routes } from '@angular/router';
import { EmployeeFormComponent } from './components/employee/employee-form/employee-form.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: EmployeeComponent, canActivate: [AuthGuard] },
  { path: 'employee',component: EmployeeComponent, canActivate: [AuthGuard] },
  // { path: 'employee/add', component: EmployeeFormComponent, canActivate: [AuthGuard] },
  // { path: 'employee/edit/:id', component: EmployeeFormComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'employee' } // ✅ fallback for unknown paths
];

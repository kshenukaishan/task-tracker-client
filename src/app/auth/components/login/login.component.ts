import { CommonModule, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatError,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm!: FormGroup;
  hidePassword = true;

  readonly authService = inject(AuthService);
  readonly snackBar = inject(MatSnackBar);

  constructor(private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit() {
    console.log(this.loginForm.value);

    this.authService.login(this.loginForm.value).subscribe((res) => {
      if (res.userId != null) {
        this.snackBar.open('User Logged successfully!', 'Close', {
          duration: 2000,
        });
      } else {
        this.snackBar.open('Wrong Credentials!', 'Close', {
          duration: 2000,
          panelClass: 'error-snackbar',
        });
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { LocalstorageService } from '../../../services/localstorage.service';

@Component({
  selector: 'users-login',
  templateUrl: './users-login.component.html',
})
export class UsersLoginComponent implements OnInit {
  loginFormGroup: FormGroup;
  isSubmitted = false;
  authError = false;
  authMessage: string;

  constructor(
    private auth: AuthService,
    private formBuilder: FormBuilder,
    private localstorageService: LocalstorageService,
    private router: Router
  ){}  

  ngOnInit(): void {
    this._initLoginForm();
  }

  private _initLoginForm() {
    this.loginFormGroup = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.loginFormGroup.invalid) return;

    this.auth.signIn(this.loginForm.username.value, this.loginForm.password.value).subscribe({
      next: (user) => {
        this.authError = false;
        this.localstorageService.setToken(user.token);
        this.router.navigate(['/']);
      },
      error: (error: HttpErrorResponse) => {
        this.authMessage = error.error.message;
        console.log("Error from server: ", error);
        this.authError = true;
        if (error.status !== 400) {
          this.authMessage = 'Error in the Server, please try again later!';
        }
      }
    });
  }

  get loginForm() {
    return this.loginFormGroup.controls;
  }


}

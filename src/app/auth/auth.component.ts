import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { delay, Observable, Subscription } from 'rxjs';
import { AuthUser, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {

  hide = true;
  loginMode = true;
  error: HttpErrorResponse | null = null;
  isLoading: boolean = false;
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(6)]);
  private authSubscription: Subscription = new Subscription();

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  changeMode() {
    this.loginMode = !this.loginMode;


    this.emailFormControl.reset();
    this.passwordFormControl.reset();

  }


  onSubmit() {
    const email = this.emailFormControl.value;
    const password = this.passwordFormControl.value;

    let authObservable: Observable<AuthUser>;
    this.isLoading = true;

    if (!this.loginMode) {
      authObservable = this.auth.registerUser(email as string, password as string);
    } else {
      authObservable = this.auth.login(email as string, password as string);
    }

    const subscription = authObservable.subscribe(res => {
      this.isLoading = false;
      this.router.navigate(['/home']);
    },
      error => {
        this.error = error
        this.isLoading = false;
      });

    this.authSubscription.add(subscription);

    this.emailFormControl.reset();
    this.passwordFormControl.reset();
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();

  }

}

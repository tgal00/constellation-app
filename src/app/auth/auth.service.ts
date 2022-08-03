import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';


export interface AuthUser {
  idToken?: string;
  email?: string;
  refreshToken?: string;
  expiresIn?: string;
  localId?: string;
  registered?: boolean;
}

export class User {
  localId!: string;
  email!: string;
  tokenExpirationDate!: Date;
  token!: string
}



@Injectable({
  providedIn: 'root'
})

export class AuthService {

  user: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) { }

  registerUser(email: string, password: string): Observable<AuthUser> {
    return this.http.post<AuthUser>(`${environment.firebaseEndpoint}/accounts:signUp?key=${environment.firebaseKey}`,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(catchError(this.handleError), tap(res => {
        this.handleAuth(res.email!, res.localId!, res.idToken!, +res.expiresIn!);
      }));
  }

  login(email: string, password: string): Observable<AuthUser> {
    return this.http.post<AuthUser>(`${environment.firebaseEndpoint}/accounts:signInWithPassword?key=${environment.firebaseKey}`,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(catchError(this.handleError), tap(res => {
        this.handleAuth(res.email!, res.localId!, res.idToken!, +res.expiresIn!);
      }));
  }

  autoLogin() {
    const userData: User = JSON.parse(localStorage.getItem("userData")!);
    if (!userData) {
      return;
    }
    const loadedUser = userData;
    if (loadedUser) {
      this.user.next(loadedUser);
      const expirationDuration = new Date(userData.tokenExpirationDate).getTime() - new Date().getTime()
      this.autoLogout(expirationDuration);
    }
  }

  getUser() {
    return this.user;
  }

  getUserId(){
    const userData: User = JSON.parse(localStorage.getItem("userData")!);
    return userData.localId;
  }

  logout(): void {
    this.user.next(null);
    this.router.navigate(["/auth"]);
    localStorage.removeItem("userData");

    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration)
  }

  private handleAuth(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 10000);
    const user: User = { email: email, localId: userId, token: token, tokenExpirationDate: expirationDate }
    this.user.next(user);
    this.autoLogout(expiresIn * 10000)
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    console.log(errorRes)
    let errorMessage = 'Uknown error';
    if (!errorRes.error || !errorRes.error.error)
      return throwError(errorMessage);
    errorMessage = errorRes.error.error.message;
    if (errorMessage == 'EMAIL_EXISTS') {
      errorMessage = "The email address is already in use by another account.";
    }
    if (errorMessage == 'EMAIL_NOT_FOUND') {
      errorMessage = "There is no user record corresponding to this email.";
    }
    if (errorMessage == 'INVALID_PASSWORD') {
      errorMessage = "The password is invalid.";
    }
    return throwError(errorMessage);
  }
}

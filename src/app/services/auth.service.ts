import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {User} from '../model/user.model';
import {tap} from 'rxjs/operators';

export interface AuthResponseData {
  accessToken:	string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new Subject<User>();

  constructor(private http: HttpClient) { }

  signUp(emailUsr: string, passwordUsr: string): Observable<any> {
    return this.http.post<AuthResponseData>('http://localhost:3000/register',
      {
        email: emailUsr,
        password: passwordUsr
      }).pipe(
      // do some actions without changing the response
      tap(resDat => {
        this.handleAuthentication(emailUsr, resDat.accessToken);
      }));
  }

  login(emailUsr: string, passwordUsr: string): Observable<any> {
    return this.http.post<AuthResponseData>('http://localhost:3000/login',
      {
        email: emailUsr,
        password: passwordUsr
      }).pipe(
      tap(resDat => {
        this.handleAuthentication(emailUsr, resDat.accessToken);
      }));
  }

  private handleAuthentication(email: string, token: string): void {
    const usr = new User(email, token);
    this.user.next(usr);
  }
}

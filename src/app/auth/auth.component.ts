import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode = true;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSwitchMode(): void{
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm): void {
    if (!authForm.valid) {
      return;
    }
    const email = authForm.value.email;
    const password = authForm.value.password;

    if (this.isLoginMode) {

    } else {
      this.authService.signUp(email, password).subscribe(
        data => {
          console.log(data);
        },
        error => {
          console.log(error);
        }
      );
    }

    authForm.reset();
  }
}

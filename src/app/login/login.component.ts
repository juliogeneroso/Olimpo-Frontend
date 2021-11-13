import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../service/authservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

  LoginForm = this.formBuilder.group({
    usuario:'',
    senha:''
  });

  ngOnInit(): void {
  }

  logar(){
    this.authService.login(this.LoginForm.value);
  }

}

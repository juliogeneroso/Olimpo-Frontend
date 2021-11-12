import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  LoginForm = this.formBuilder.group({
    usuario:'',
    senha:''
  });

  ngOnInit(): void {
  }

  logar(){
    console.log(this.LoginForm.value);
  }

}

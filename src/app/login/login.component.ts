import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../service/authservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  erro:boolean = false;
  mensagemErro = "ID ou Senha incorretos";

  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

  LoginForm = this.formBuilder.group({
    id:'',
    senha:''
  });

  ngOnInit(): void {
    this.authService.erroEmitter.subscribe(erro=>{
      this.erro = erro;
    });
  }

  logar(){
    this.authService.erroEmitter.emit(false);
    this.authService.login(this.LoginForm.value);
  }

}

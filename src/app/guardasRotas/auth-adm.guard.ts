import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, CanLoad, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/authservice.service';

@Injectable({
  providedIn: 'root'
})
export class AuthAdmGuard implements CanActivate, CanLoad{

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):Observable<boolean> | boolean{
    return this.verificarAcesso();
  }

  private verificarAcesso(){
    if(this.authService.usuarioAdministrador()){
      return true;
    }
    this.router.navigate(['/entrada-saida']);
    return false;
  }

  canLoad(router:Route):Observable<boolean>|Promise<boolean>|boolean{
    return this.verificarAcesso();
  }
  
}
import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../service/authservice.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  mostrarMenu:boolean = false;
  rotaAdm:boolean = false;

  constructor(private breakpointObserver: BreakpointObserver,private authService: AuthService) {}

  ngOnInit(){
    this.authService.mostrarMenuEmitter.subscribe(mostrar => {
      this.mostrarMenu = mostrar;
    })
    this.authService.rotaAdmEmitter.subscribe(rota=>{
      this.rotaAdm = rota;
    })
  }

}

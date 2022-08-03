import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from './auth/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  
  constructor(private authService:AuthService, private router:Router){}
   ngOnInit(): void {
      this.authService.autoLogin();
      this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
 
     .subscribe(() => {
       document.querySelector('.mat-sidenav-content')!.scrollTop = 0;
     });
   }

}

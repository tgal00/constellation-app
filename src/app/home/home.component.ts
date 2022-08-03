import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { SideNavService } from '../sidenav/side-nav.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

 

  @ViewChild('sidenav') public sidenav!: MatSidenav;
  constructor(private auth:AuthService,private sideNavService:SideNavService, private router:Router) { }

  ngOnInit(): void {
    this.sideNavService.sideNavToggleSubject.subscribe(()=> {
      if(this.sidenav)
        this.sidenav.toggle();
    });
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
 
     .subscribe(() => {
       document.querySelector('.mat-sidenav-content')!.scrollTop = 0;
     });
  }

  logout(){
    this.auth.logout();
  }


  


}

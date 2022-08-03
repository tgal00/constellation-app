import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from 'src/app/auth/auth.service';
import { SideNavService } from '../sidenav/side-nav.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

 

  @ViewChild('sidenav') public sidenav!: MatSidenav;
  constructor(private auth:AuthService,private sideNavService:SideNavService) { }

  ngOnInit(): void {
    this.sideNavService.sideNavToggleSubject.subscribe(()=> {
      if(this.sidenav)
        this.sidenav.toggle();
    });
  }

  logout(){
    this.auth.logout();
  }


  


}

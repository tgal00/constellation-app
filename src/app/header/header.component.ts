import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { SideNavService } from '../sidenav/side-nav.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private auth:AuthService,private sideNavService:SideNavService) { }

  ngOnInit(): void {
  }

  onLogout(){
    this.auth.logout();
  }

  toggleSidenav(){
    this.sideNavService.toggle();
  }
}

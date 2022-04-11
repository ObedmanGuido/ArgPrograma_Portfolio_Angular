import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn = false;
  username = '';

  constructor(private tokenService: TokenService, private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = this.tokenService.isLoggedIn();
    this.username = this.tokenService.getUsername();
  }

  onLogout(): void {
    this.tokenService.logout();
    this.router.navigate(['/portfolio']);
  }
}
import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from './service/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  isLogin = false;
  roles!: string[];
  authority!: string;

  constructor(
    private tokenService: TokenService,
    private router: Router,
    private scroller: ViewportScroller
  ) {}

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.isLogin = true;
      this.roles = [];
      this.roles = this.tokenService.getAuthorities();
      this.roles.every((rol) => {
        if (rol === 'ROLE_ADMIN') {
          this.authority = 'admin';
          return false;
        }
        this.authority = 'user';
        return true;
      });
    }
    
  }

  navegarA(anchor: string) {
    this.scroller.setOffset([0, 80]);
    this.scroller.scrollToAnchor(anchor)}
    
  logOut(): void {
      this.tokenService.logOut();
      this.isLogin = false;
      this.authority = '';
      this.router.navigate(['']);
      window.location.reload();
    }}
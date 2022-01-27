import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/models/user';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {

  user?: any;
  loggedIn: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') as string);
    if(this.user == null) {
      this.loggedIn = false;
      this.user = {'role': ''}
    }
    else {
      this.loggedIn = true;
    }
  }

  onLogout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.loggedIn = false;
    this.router.navigate(["/login"]);
  }
}

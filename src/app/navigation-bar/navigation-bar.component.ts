import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {

  user?: any;
  loggedIn: boolean = false;
  primaryNav: any;
  navToggle: any;


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

    this.primaryNav = document.querySelector('.primary-navigation');
    this.navToggle = document.querySelector('.mobile-nav-toggle');
    this.navToggle.addEventListener('click', () => {
        this.activateMenu();
    });
  }

  onClick() {
    this.activateMenu();
  }

  activateMenu() {
    let visibility = this.primaryNav.getAttribute('data-visible');

    if (visibility === "false") {
      this.primaryNav.setAttribute('data-visible', 'true');
      this.navToggle.setAttribute('aria-expanded', 'true');
    }
    else {
      this.primaryNav.setAttribute('data-visible', 'false');
      this.navToggle.setAttribute('aria-expanded', 'false');
    }
  }

  onLogout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.loggedIn = false;
    this.router.navigate(["/login"]);
    this.activateMenu();
  }
}

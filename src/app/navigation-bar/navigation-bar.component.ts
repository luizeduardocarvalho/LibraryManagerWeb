import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/services/local-storage.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
})
export class NavigationBarComponent implements OnInit {
  user?: any;
  loggedIn: boolean = false;

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.localStorageService.user.subscribe((nextValue: any) => {
      this.user = JSON.parse(this.localStorageService._user);
      console.log(this.user);
      if (this.user == null) {
        this.loggedIn = false;
        this.user = { role: '' };
      } else {
        this.loggedIn = true;
      }
    });
  }

  onClick() {
    this.activateMenu();
  }

  activateMenu() {
    let primaryNav = document.querySelector('.primary-navigation');
    let navToggle = document.querySelector('.mobile-nav-toggle');

    let visibility = primaryNav!.getAttribute('data-visible');

    if (visibility === 'false') {
      primaryNav!.setAttribute('data-visible', 'true');
      navToggle!.setAttribute('aria-expanded', 'true');
    } else {
      primaryNav!.setAttribute('data-visible', 'false');
      navToggle!.setAttribute('aria-expanded', 'false');
    }
  }

  onLogout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.loggedIn = false;
    this.router.navigate(['/login']);
    this.activateMenu();
  }
}

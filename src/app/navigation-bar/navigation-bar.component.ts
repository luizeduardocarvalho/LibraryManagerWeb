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

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') as string);
    if(this.user == null) {
      this.user = {'role': ''}
    }
  }

  onLogout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(["/login"]);
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-my-area',
  templateUrl: './my-area.component.html',
  styleUrls: ['./my-area.component.scss']
})
export class MyAreaComponent implements OnInit {
  userId = "0";

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.userId = params['id'];
    });
  }

}

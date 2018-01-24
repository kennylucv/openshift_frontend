import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-greeting',
  templateUrl: './greeting.component.html',
  styleUrls: ['./greeting.component.css']
})
export class GreetingComponent implements OnInit {

  clicked = false;
  totalClicks = 0;

  constructor() {}

  ngOnInit() {
  }

  onClick() {
    this.clicked = true;
    this.totalClicks++;
  }

}

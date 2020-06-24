import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user_data: {
    name: string, surname: string, bonuses:string,
  }

  @Input() isAuth: boolean;

  constructor() { }

  ngOnInit(): void {
    this.user_data = JSON.parse(localStorage.getItem('userData'));
  }

}

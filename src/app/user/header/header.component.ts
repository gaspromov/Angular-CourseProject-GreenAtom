import { Component, OnInit, Input } from '@angular/core';
import { FireAuthService } from 'src/app/shared/services/auth/fire-auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user_data: {
    name: string, surname: string, bonuses:string,
  }

  @Input() isAuth: string;

  constructor(
    public auth: FireAuthService
  ) { }

  ngOnInit(): void {
    this.user_data = JSON.parse(localStorage.getItem('userData'));
  }

  signOut(){
    this.auth.SignOut();
    window.location.reload();
  }

}

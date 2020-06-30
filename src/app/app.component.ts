import { Component } from '@angular/core';
import { FireAuthService } from './shared/services/auth/fire-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GreenAtom';
  isAuth: string;

  constructor(
    public auth: FireAuthService,
  ){

  }

  ngOnInit(){
    if (this.auth.isLoggedIn ){
      if (JSON.parse(localStorage.getItem('userData')).status == 'worker')
        this.isAuth = 'worker';
      else if (JSON.parse(localStorage.getItem('userData')).status == 'admin')
        this.isAuth = 'admin';
      else this.isAuth = 'no'
    }else{
      this.isAuth = 'no';
    }
  }
}

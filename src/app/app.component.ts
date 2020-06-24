import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GreenAtom';
  isAuth: boolean;

  ngOnInit(){
    if (JSON.parse(localStorage.getItem('user')) && JSON.parse(localStorage.getItem('user')).emailVerified ){
      this.isAuth = true;
    }else{
      this.isAuth = false;
    }
  }
}

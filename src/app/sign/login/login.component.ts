import { Component, OnInit } from '@angular/core';
import { FireAuthService } from 'src/app/shared/services/auth/fire-auth.service';
import { FirestoreAuthService } from 'src/app/shared/services/auth/firestore-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  email: string;
  password: string;

  constructor(
    public authService: FireAuthService,
    public fireStore: FirestoreAuthService,
  ) { }

  ngOnInit(): void {
  }
  
  async login(email, password){
    this.authService.login(email, password)
    // .then(() =>{
    this.fireStore.setUserData(email);
    console.log(email)
    // });
  }

}

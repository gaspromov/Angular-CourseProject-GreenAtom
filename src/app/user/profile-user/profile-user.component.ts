import { Component, OnInit } from '@angular/core';
import { FireAuthService } from 'src/app/shared/services/auth/fire-auth.service';
import { Router } from '@angular/router';
import { FirestoreAuthService } from 'src/app/shared/services/auth/firestore-auth.service';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.css']
})
export class ProfileUserComponent implements OnInit {
  user_data: {
    uid: string, name: string, surname: string, phone: string, email: string, about: string, profession: string, bonuses: string
  };
  about: string;
  confirm = false;

  constructor(
    public auth: FireAuthService,
    public firestoreAuth: FirestoreAuthService,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.user_data = JSON.parse(localStorage.getItem('userData'))
    console.log(this.user_data.profession)
    this.about = this.user_data.about;
    console.log(this.user_data.profession)
  }

  logout(){
    this.auth.SignOut();
    window.location.reload();
  }

  async onSave(){
    await this.firestoreAuth.updateUser(this.user_data.uid, { about: this.about})
    await this.firestoreAuth.setUserData(this.user_data.email)
    this.confirm = true;
  }

}

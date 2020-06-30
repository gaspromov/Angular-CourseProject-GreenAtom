import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    public firestore: AngularFirestore,
    public router: Router,
  ) { }


  getUsers(){
    return this.firestore.collection('users').snapshotChanges();
  }

  updateUser(id: string, new_data){
    this.firestore.doc('users/' + id).update(new_data);
  }

}

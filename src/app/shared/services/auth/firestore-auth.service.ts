import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreAuthService {
  userData: any;
  store: any;

  constructor(
    public firestore: AngularFirestore,
  ) { }


  setUserData(email: string) {
    this.firestore.collection('users', ref => ref.where('email', '==', email)).snapshotChanges().subscribe(res => {
      let userData = this.setVariable(res);
      localStorage.setItem('userData', JSON.stringify(userData)); //Use the returned data as you normally would
    });
  }

  setVariable(res){
    let userData;
    userData = {
        uid: res[0].payload.doc.id,
        email: res[0].payload.doc.get('email'),
        name: res[0].payload.doc.get('name'),
        surname: res[0].payload.doc.get('surname'),
        phone: res[0].payload.doc.get('phone'),
        profession: res[0].payload.doc.get('profession'),
        about: res[0].payload.doc.get('about'),
        bonuses: res[0].payload.doc.get('bonuses'),
    }
    return userData;
  }

  // getSchedule() {
  //   return this.firestore
  //     .collection("users")
  //     .doc('8CtHJR8xrAbEwSFqxlNG')
  //     .ref.get()
  //     .then(function(doc) {
  //       return doc.data();   // here...
  //     });
  // }

  createUser(data_user){
    return this.firestore.collection('users/').add(data_user);
  }
  
  updateUser(id_user: string, data_user){
    // delete policy.id;
    this.firestore.doc('users/' + id_user).update(data_user);
  }

  deleteUser(id: string){
    this.firestore.doc('users/' + id).delete();
  }

  getUsers(){
    return this.firestore.collection('users/').snapshotChanges()
  }
}

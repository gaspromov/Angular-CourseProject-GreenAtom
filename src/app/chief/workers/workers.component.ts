import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/shared/services/firestore/users.service';

@Component({
  selector: 'app-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.css']
})
export class WorkersComponent implements OnInit {
  users: any = [{}];
  add_bonuses: number = 0;
  idAddB = '';
  input = true;
  modalProfileId = '';
  modalNewTaskId = '';

  constructor(
    public db: UsersService,
  ) { }

  ngOnInit(): void {
    this.db.getUsers().subscribe( data => {
      this.users = data.map( e => {
          return this.setUser(e);
      })
    })
  }

  setUser(e){
    let user;
      user = {
        uid: e.payload.doc.id,
        email: e.payload.doc.get('email'),
        name: e.payload.doc.get('name'),
        surname: e.payload.doc.get('surname'),
        phone: e.payload.doc.get('phone'),
        profession: e.payload.doc.get('profession'),
        about: e.payload.doc.get('about'),
        bonuses: e.payload.doc.get('bonuses'),
        status: e.payload.doc.get('status')
      }
      return user;
  }

  async giveBonuses(uid, user_bonuses){
    if ( this.idAddB != ''){
      await this.db.updateUser(uid, {bonuses: Number(user_bonuses) + Number(this.add_bonuses) });
      this.idAddB = '';
    }else{
      this.idAddB = uid;
    }
    
  }

  modal(uid, type){
    if (type == '1')
      this.modalProfileId = uid;
    else if ( type == '2' )
      this.modalNewTaskId = uid;
  }

}

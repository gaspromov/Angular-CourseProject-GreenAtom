import { Component, OnInit } from '@angular/core';
import { TasksService } from 'src/app/shared/services/firestore/tasks.service';
import { UsersService } from 'src/app/shared/services/firestore/users.service';
import { FirestoreAuthService } from 'src/app/shared/services/auth/firestore-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-tasks',
  templateUrl: './my-tasks.component.html',
  styleUrls: ['./my-tasks.component.css']
})
export class MyTasksComponent implements OnInit {
  tasks: any = [{}];
  uid = JSON.parse(localStorage.getItem('userData')).uid;
  email = JSON.parse(localStorage.getItem('userData')).email;
  bonuses = JSON.parse(localStorage.getItem('userData')).bonuses;

  constructor(
    public db: TasksService,
    public dbUser: UsersService,
    public dbAuth: FirestoreAuthService,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.db.getUserTasks(this.uid).subscribe( data =>{
      this.tasks = data.map( e => {
        return this.setTask(e);
      })
    })
  }

  setTask(e){
    let task = {
      id: e.payload.doc.id,
      uid: e.payload.doc.get('uid'),
      name: e.payload.doc.get('name'),
      descript: e.payload.doc.get('descript'),
      date: e.payload.doc.get('date'),
      bonuses: e.payload.doc.get('bonuses'),
      status: e.payload.doc.get('status')
    }
    return task;
  }

  cancel(task_id){
    this.db.updateTask(task_id, {uid: '', status: 'free'});
  }

  async performe(task_id, bonuses_add){
    await this.db.updateTask(task_id, {status: 'performed'});
    await this.dbUser.updateUser(this.uid, {bonuses: Number(this.bonuses) + Number(bonuses_add)});
    await this.dbAuth.setUserData(this.email);
  }

}

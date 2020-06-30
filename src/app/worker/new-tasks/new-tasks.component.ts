import { Component, OnInit } from '@angular/core';
import { TasksService } from 'src/app/shared/services/firestore/tasks.service';

@Component({
  selector: 'app-new-tasks',
  templateUrl: './new-tasks.component.html',
  styleUrls: ['./new-tasks.component.css']
})
export class NewTasksComponent implements OnInit {
  tasks: any = [{}];
  uid = JSON.parse(localStorage.getItem('userData')).uid;

  constructor(
    public db: TasksService
  ) { }

  ngOnInit(): void {
    this.db.getNewTasks().subscribe( data =>{
      this.tasks = data.map( e => {
        return this.setTask(e);
      })
    })
  }

  setTask(e){
    let task = {
      id: e.payload.doc.id,
      name: e.payload.doc.get('name'),
      descript: e.payload.doc.get('descript'),
      date: e.payload.doc.get('date'),
      bonuses: e.payload.doc.get('bonuses'),
    }
    return task;
  }

  takeTask(task_id){
    this.db.updateTask(task_id, {uid: this.uid, status: "inProcess"});
  }
}

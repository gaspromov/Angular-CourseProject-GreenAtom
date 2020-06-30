import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  constructor(
    public firestore: AngularFirestore,
    public router: Router,
  ) { }


  getTasks(){
    return this.firestore.collection('tasks').snapshotChanges();
  }
  
  getNewTasks(){
    return this.firestore.collection('tasks', ref => ref.where('uid', '==', '')).snapshotChanges();
  }

  getUserTasks(id_user){
    return this.firestore.collection('tasks', ref => ref.where('uid', '==', id_user)).snapshotChanges();
  }

  addTask(data){
    this.firestore.collection('tasks/').add(data)
  }

  updateTask(id: string, data_order){
    this.firestore.doc('tasks/' + id).update(data_order);
  }
  
  deleteTask(id: string){
    this.firestore.doc('tasks/' + id).delete();
  }
}

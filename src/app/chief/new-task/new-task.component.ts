import { Component, OnInit, Input } from '@angular/core';
import { UsersService } from 'src/app/shared/services/firestore/users.service';
import { TasksService } from 'src/app/shared/services/firestore/tasks.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {
  formAdd: FormGroup;
  @Input() uid: string = '';
  @Input() title: string = '';
  disabled = false;
  confirm = false;
  

  constructor(
    public db: TasksService,
  ) { 
  }

  ngOnInit(): void {
    console.log(this.uid)
    console.log(this.title)
    this.formAdd = new FormGroup({
      uid: new FormControl({ value: this.uid, disabled: this.disabled }),
      status: new FormControl({ value: this.setStatus(this.uid), disabled: this.disabled }),
      name: new FormControl({ value: '', disabled: this.disabled }, [Validators.required]),
      descript: new FormControl({ value: '', disabled: this.disabled }, [Validators.required]),
      date: new FormControl({ value: '', disabled: this.disabled }, [Validators.required]),
      bonuses: new FormControl({ value: '', disabled: this.disabled }, [Validators.required])
    })
  }

  onAddTask(){
    console.log(this.formAdd.value, this.uid)
    this.db.addTask(this.formAdd.value);
    this.confirm = true;
  }

  setStatus(uid){
    if (uid == ''){
      return "free";
    }else{
      return "inProcess";
    }
  }


}

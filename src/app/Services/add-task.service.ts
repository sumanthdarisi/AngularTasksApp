import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Task } from '../Model/task';

@Injectable({
  providedIn: 'root'
})
export class AddTaskService {

  
  constructor() { }

  private newTaskDetails = new Subject<Task>();
  taskDetails$ = this.newTaskDetails.asObservable();

  sendTaskInfo(taskInfo: any){
    console.log('service',taskInfo);
    this.newTaskDetails.next(taskInfo);
  }

  tasks: Task[] = new Array<Task>();

  addTask(tas: Task)
  {
    let taskID = this.tasks.push(tas);
    let index = taskID -1;
    return index;
  }

  remove(card: Task){
    let id = this.tasks.indexOf(card);
    setTimeout(() => {
      this.tasks.splice(id,1);
    }, 500);
  }

  getTasks()
  {
    return this.tasks;
  }

  getTaskID(id: number)
  {
    return this.tasks[id];
  }

}

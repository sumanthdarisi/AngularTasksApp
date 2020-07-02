import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Task } from '../Model/task';
import { AddTaskService } from '../Services/add-task.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  constructor(private taskService : AddTaskService, private router: Router, private taskid: ActivatedRoute) { }
  taskID: number;
  task: Task;
  newTask: boolean = false;

  ngOnInit(): void {
    this.taskid.params.subscribe((params: Params) => {
      this.task = new Task();
      if(params.id){
        this.task = this.taskService.getTaskID(params.id);
        this.taskID = params.id;
        this.newTask = false;
      }
      else{
        this.newTask = true;
      }
    })
  }

  registrationForm = new FormGroup({
    header: new FormControl('',[Validators.required,Validators.minLength(3)]),
    description: new FormControl('',[Validators.required])
  });
  
 f_Task(taskdata: Task)
 {
   if(this.newTask){
    this.taskService.addTask(taskdata);
    this.router.navigateByUrl('/home');
   }
   else{
     this.taskService.update(this.taskID,taskdata.header, taskdata.description);
     this.router.navigateByUrl('/home');
   }
 }  
}

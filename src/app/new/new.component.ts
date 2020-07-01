import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Task } from '../Model/task';
import { AddTaskService } from '../Services/add-task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  constructor(private taskService : AddTaskService, private router: Router) { }

  task: Task;

  ngOnInit(): void {
    this.task = new Task();
  }

  registrationForm = new FormGroup({
    header: new FormControl('',[Validators.required,Validators.minLength(3)]),
    description: new FormControl('',[Validators.required])
  });
  
 f_Task(taskdata: Task)
 {
    this.taskService.addTask(taskdata);
    this.router.navigateByUrl('/home');
 }
  
}

import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Task } from '../Model/task';
import { AddTaskService } from '../Services/add-task.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  
  private cardid: number;
  cards: Task[] = new Array<Task>();
  count: boolean = true; //0
  
  constructor(private taskServ: AddTaskService ) { }

  ngOnInit(): void {
    this.cards = this.taskServ.getTasks();
    if(this.cards.length >=1){
      this.count = false; // >0
    }
    console.log(this.count);
  }

  remove(card)
  {
    this.taskServ.remove(card);
    setTimeout(() => {
      if(this.cards.length <= 1){
        this.count = true; // >0
      }  
    }, 500);
    
  }
  

}

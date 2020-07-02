import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Task } from '../Model/task';
import { AddTaskService } from '../Services/add-task.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  
  cards: Task[] = new Array<Task>();
  filteredCards: Task[] = new Array<Task>();
  count: boolean = true; //0

  
  constructor(private taskServ: AddTaskService ) { }

  ngOnInit(): void {
    this.cards = this.taskServ.getTasks();
    this.filteredCards = this.cards;
    if(this.cards.length >0){
      this.count = false; // >0
    }

  }

  remove(card)
  {
    this.taskServ.remove(card);
    setTimeout(() => {
      if(this.cards.length < 1){
        this.count = true; // >0
      }  
    }, 500);
    
  }
  
  filter(text: string){
    let filterTasks: Task[] = new Array<Task>();
    
    text = text.toLowerCase().trim();
    let words: string[] = text.split(' ');
    words = this.removeDuplicates(words);

    words.forEach(word => {
      let results: Task[] = this.relevantCard(word);
      filterTasks = [...filterTasks,...results];
    });
    
    this.filteredCards = filterTasks;
  }


  removeDuplicates(arr: Array<any>) : Array<any>
  {
    let uniqueArr: Set<any> = new Set<any>();
    arr.forEach(e => {
        uniqueArr.add(e);
    });
    return Array.from(uniqueArr);
  }

  relevantCard(text: string): Array<Task>{
    text = text.toLowerCase().trim();
    let relevant = this.cards.filter(e=>{
      if(e.header && e.header.toLowerCase().includes(text))
        return true;
      if(e.description && e.description.toLowerCase().includes(text))
        return true;
      else
        return false;
    })
    return relevant;
  }
}

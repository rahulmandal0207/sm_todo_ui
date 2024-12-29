import { HttpClient } from '@angular/common/http';
import { Component, NgModule } from '@angular/core';
import { AppService } from '../utils/app.service';
import { TodoItem } from '../utils/todo-item';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css',
})

export class TodoComponent {

  todos: any = [];

  TodoItemObj: TodoItem = {
    Id: 0,
    Title: '',
    Status: false,
  }

  constructor(private service: AppService) {}

  ngOnInit() {
    this.getAllTodos();
  }

  getAllTodos() {
    this.service.getAllTodos().subscribe((res: any) => {
      if (res.Message == 'Success') {
        this.todos = res.Data;
      }
    });
  }

  saveTodo() {
    debugger;
    this.service.saveTodo(this.TodoItemObj).subscribe((res: any) => {
      if (res.Message == 'Success') {
        this.getAllTodos();
        this.TodoItemObj.Id = 0;
        this.TodoItemObj.Title = '';
        this.TodoItemObj.Status = false;
      } else {
        console.log(res.Message);
      }
     });
  }

  deleteTodo(Id:number) {
    debugger;
    if (confirm('Are you sure you want to delete this record?')) {
      this.service.deleteTodo(Id).subscribe((res: any) => {
      if (res.Message == 'Success') {
        this.getAllTodos();
      }
    });
    }
  }

  toggleTodoStatus(item: TodoItem) {
    debugger;
    const Id = item.Id;

    this.service.updateTodo(Id, item).subscribe((res: any) => {
      if (res.Message == "Success") {
        this.getAllTodos();
      }
    })
  }

}

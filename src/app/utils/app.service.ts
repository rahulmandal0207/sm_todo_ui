import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TodoItem } from './todo-item';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  appUrl = 'https://localhost:44347/api/todo';

  constructor(private http: HttpClient) {}

  getAllTodos() {
    return this.http.get(this.appUrl);
  }

  saveTodo(item: TodoItem) {
    return this.http.post(this.appUrl, item);
  }

  deleteTodo(Id: number) {
    return this.http.delete(this.appUrl + '/' + Id);
  }

  updateTodo(Id:number, item:TodoItem) {
   return this.http.put(this.appUrl + '/' + Id, item)
  }
}

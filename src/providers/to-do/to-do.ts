import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class ToDoProvider {
  todos:Array<any> = [];

  constructor(private storage: Storage) {
    console.log('Hello ToDoProvider Provider');
    this.todos = [];
  }

  all(type?:string) {
    if (this.todos.length) {
      return Promise.resolve(this.getToDos(type));
    }

    return new Promise(resolve => {
      this.storage.get('todos').then(data => {
        this.todos = data || [];
        resolve(this.getToDos(type));
      });
    });
  }

  getToDos(type?:string) {
    let status = type || 'active';
    return this.todos.filter(t => t.status == status);
  }

  add(todo) {
    todo.id = this.getLastID() + 1;
    this.todos.push(todo);
    this.storage.set('todos', this.todos);
    return Promise.resolve(this.all());
  }

  markAsDone(todo) {
    let finishedToDo = this.todos.find(t => t.id == todo.id);
    finishedToDo.status = 'archived'
    this.storage.set('todos', this.todos);
    return Promise.resolve(this.all());
  }

  markAsUndone(todo) {
    let finishedToDo = this.todos.find(t => t.id == todo.id);
    finishedToDo.status = 'active'
    this.storage.set('todos', this.todos);
    return Promise.resolve(this.all('archived'));
  }

  clear() {
    this.todos = [];
    this.storage.remove('todos');
    return Promise.resolve(this.all());
  }

  getLastID() {
    let ids = this.todos.map(t => t.id);
    if (!ids.length) { ids = [0]; }
    return Math.max.apply(null, ids);
  }


}

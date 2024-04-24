import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Token, Task } from '../models';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  BASE_URL = 'http://127.0.0.1:8000'


  constructor(private http: HttpClient) { }


  login(username: string, password: string) : Observable<Token> {
    return this.http.post<Token>(
      `${this.BASE_URL}/api/login/`,
      {username, password}
    )
  }

  getTasks() :Observable<Task[]> {
    return this.http.get<Task[]>(
      `${this.BASE_URL}/api/tasks/`
    )
  }

  createTask(newTask: Task) :Observable<Task> {
    return this.http.post<Task>(
      `${this.BASE_URL}/api/tasks/`,
      newTask
    )
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/api/tasks/${id}`);
  }
}

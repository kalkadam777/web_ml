import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  BASE_URL = 'http://127.0.0.1:8000'
  
  constructor(private http: HttpClient) { }

  getComments() :Observable<Comment[]> {
    return this.http.get<Comment[]>(
      `${this.BASE_URL}/api/comments/`
    )
  }
}

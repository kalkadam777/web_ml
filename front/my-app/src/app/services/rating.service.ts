import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rating } from '../models';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  BASE_URL = 'http://127.0.0.1:8000'


  constructor(private http: HttpClient) { }

  getRating() :Observable<Rating[]> {
    return this.http.get<Rating[]>(
      `${this.BASE_URL}/api/rating/`
    )
  }
}

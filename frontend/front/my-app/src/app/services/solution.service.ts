import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Solution } from '../models';

@Injectable({
  providedIn: 'root'
})
export class SolutionService {

  BASE_URL = 'http://127.0.0.1:8000'
  
  constructor(private http: HttpClient) { }

  // getSolution(id: number) :Observable<Solution> {
  //   return this.http.get<Solution>(
  //     `${this.BASE_URL}/api/tasks/${id}/solutions`
  //   )
  // }
  getSolution(id: number) :Observable<Solution> {
    return this.http.get<Solution>(
      `${this.BASE_URL}/api/tasks/${id}/solutions`
    ).pipe(
      tap(data => console.log('Solution data:', data)),
      catchError(error => {
        console.error('Error fetching solution:', error);
        return throwError(error);
      })
    );
  }
}
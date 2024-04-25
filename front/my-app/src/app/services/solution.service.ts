import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Solution, SolutionCreate } from '../models';

@Injectable({
  providedIn: 'root'
})
export class SolutionService {

  BASE_URL = 'http://127.0.0.1:8000'
  
  constructor(private http: HttpClient) { }

  getSolutions(id: number):Observable<Solution[]> {
    return this.http.get<Solution[]>(
      `${this.BASE_URL}/api/tasks/${id}/solutions`
    )
  }

  createSolution(solution: SolutionCreate):Observable<SolutionCreate> {
    return this.http.post<SolutionCreate>(
      `${this.BASE_URL}/api/solutions/`, solution
    )
  }

}
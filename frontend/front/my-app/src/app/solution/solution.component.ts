import { Component, OnInit } from '@angular/core';
import { SolutionService } from '../services/solution.service';
import { Solution } from '../models';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-solution',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './solution.component.html',
  styleUrl: './solution.component.css'
})
export class SolutionComponent implements OnInit{
  solution$!: Observable<Solution>;

  constructor(private solutionService: SolutionService,private route: ActivatedRoute,) {}

  ngOnInit() {
    this.solution$ = this.route.paramMap.pipe(
      switchMap(params => {
        const taskId: number = Number(params.get('taskId'));
        console.log('Task ID:', taskId); 
        return this.solutionService.getSolution(taskId);
      })
    );
  }


}

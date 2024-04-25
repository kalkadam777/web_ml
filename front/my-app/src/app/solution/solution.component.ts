import { Component, OnInit } from '@angular/core';
import { SolutionService } from '../services/solution.service';
import { Solution } from '../models';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';


@Component({
  selector: 'app-solution',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './solution.component.html',
  styleUrl: './solution.component.css'
})
export class SolutionComponent implements OnInit{
  solutions: Solution[] = [];
  task_id!: number;

  constructor(private solutionService: SolutionService,private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const taskId: number = Number(params.get('taskId'));
      this.task_id = taskId;
      this.solutionService.getSolutions(taskId).subscribe((solution) => {
        this.solutions = solution;
      });
    })
  }
}

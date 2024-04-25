import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Solution, SolutionCreate } from '../models';
import { SolutionService } from '../services/solution.service';
import { CommonModule } from '@angular/common';
import { Modal } from 'bootstrap';
import { ModalService } from '../services/modal.service';


@Component({
  selector: 'app-solution-submit-modal',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './solution-submit-modal.component.html',
  styleUrl: './solution-submit-modal.component.css'
})

export class SolutionSubmitModalComponent  implements OnInit{

  solutionText: SolutionCreate
  taskId : number = 0;
  @ViewChild('solutionModal') solutionModal!: ElementRef;
  constructor(private solutionService:SolutionService, private modalService: ModalService) {
    this.solutionText = {
        id:0,
        author:2,
        submit_time: new Date().toISOString(),
        content:'',
        task:this.taskId,
        points: 0
      };
  }

  ngOnInit(): void {
    this.modalService.currentTaskId.subscribe(taskId => {
      if (taskId !== null) {  
        this.taskId = taskId;
        this.solutionText.task = taskId;
        console.log(this.taskId);
      }
    });
    
  }

  
  submitSolution() {
    this.solutionService.createSolution(this.solutionText).subscribe((data) => {
      console.log(data)
      // this.closeModal();
    })
  }

  closeModal() {
    const modal = new Modal(this.solutionModal.nativeElement);
    modal.hide();
  }
  
}

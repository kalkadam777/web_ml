import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskService } from '../services/task.service';
import { Task } from '../models';

@Component({
  selector: 'app-create-task-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-task-modal.component.html',
  styleUrl: './create-task-modal.component.css'
})
export class CreateTaskModalComponent {
  @Output() close = new EventEmitter<void>();
  newTask: Task
  updateId = 0;
  constructor(private taskService:TaskService) { 
    this.newTask = {
      id: 0,
      name: '',
      statement: '',
      start_time: new Date().toISOString(),
      author: 1,
      points: 0
    };
    this.updateId = taskService.updateId;
  }

  onSubmit(form: NgForm, id: number) {
    // console.log('Creating task:', this.newTask);
    // if (form.valid) {
    //   this.taskService.createTask(this.newTask).subscribe({
    //     next: (task) => {
    //       console.log('Task created:', task);
    //       this.closeModal();
    //     },
    //     error: (error) => {
    //       console.error('Error creating task:', error);
    //     }
    //   });
    // }
    // else {
    //   console.error('Form is invalid');
    // }
    console.log(this.taskService.updateId);
    if(this.taskService.updateId === 0) {
      console.log(id);
      console.log('Creating task:', this.newTask);
      if (form.valid) {
        this.taskService.createTask(this.newTask).subscribe({
          next: (task) => {
            console.log('Task created:', task);
            this.closeModal();
          },
          error: (error) => {
            console.error('Error creating task:', error);
          }
        });
      }
      else {
        console.error('Form is invalid');
      }
   }
   else {
    console.log('Updating task:', this.newTask);
    if (form.valid) {
      this.taskService.updateTask(id, this.newTask).subscribe({
        next: (task) => {
          console.log('Task updated:', task);
          this.closeModal();
        },
        error: (error) => {
          console.error('Error updating task:', error);
        }
      });
    }
    else {
      console.error('Form is invalid');
    }
   }
  }

  closeModal() {
    this.close.emit(); 
  }
}

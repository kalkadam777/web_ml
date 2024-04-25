import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CommentService } from '../services/comment.service';
import { ModalService } from '../services/modal.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Comment } from '../models';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-comment-submit-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comment-submit-modal.component.html',
  styleUrl: './comment-submit-modal.component.css'
})
export class CommentSubmitModalComponent implements OnInit {
  commentText!: Comment; 
  @Input() taskId!: number;
  @ViewChild('solutionModal') solutionModal!: ElementRef;

  constructor(private commentService: CommentService, private modalService: ModalService) {}

  ngOnInit(): void {
    this.commentText = {
      user: 2,
      id: 0,
      content: '',
      votes: 0,
      user_id: 0,
      task: this.taskId 
    };
  }

  submitSolution() {
    if (this.taskId) { 
      this.commentService.createComment(this.commentText).subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (error) => {
          console.error('Error submitting comment:', error);
        }
      });
    } else {
      console.error('Task ID is not set.');
    }
  }

}

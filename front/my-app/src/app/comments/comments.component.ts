import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Comment } from '../models';
import { CommentService } from '../services/comment.service';
import { CommentSubmitModalComponent } from "../comment-submit-modal/comment-submit-modal.component";

@Component({
    selector: 'app-comments',
    standalone: true,
    templateUrl: './comments.component.html',
    styleUrl: './comments.component.css',
    imports: [CommonModule, FormsModule, CommentSubmitModalComponent]
})

export class CommentsComponent implements OnInit{
  comments: Comment[] = []
  constructor(private commentService:CommentService) {}

  ngOnInit(): void {
      this.getComments()
  }
  getComments() {
    this.commentService.getComments().subscribe((data) => {
      this.comments = data
    })
  }
}
